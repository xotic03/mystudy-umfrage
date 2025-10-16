import 'dotenv/config';
import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events
} from 'discord.js';
import { fetchAllResponses } from './firestore.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (c) => {
  console.log(`✅ Eingeloggt als ${c.user.tag}`);

  // Slash Command registrieren
  await client.application.commands.set(
    [
      {
        name: 'auswertung',
        description: 'Zeigt die Umfrage-Auswertung als Diagramm an',
      },
    ],
    process.env.GUILD_ID
  );

  console.log('📊 Slash-Command /auswertung bereit.');
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== 'auswertung') return;

  await interaction.deferReply();

  try {
    const responses = await fetchAllResponses();

    if (!responses.length) {
      await interaction.editReply('📭 Keine Antworten gefunden.');
      return;
    }

    // Frage → Liste von Antworten
    const questionMap = new Map();

    for (const entry of responses) {
      const resArr = entry.responses || [];
      for (const r of resArr) {
        const q = r.question?.trim();
        const a = r.answer?.trim() || '(leer)';
        if (!q) continue;
        if (!questionMap.has(q)) questionMap.set(q, []);
        questionMap.get(q).push(a);
      }
    }

    if (!questionMap.size) {
      await interaction.editReply('⚠️ Keine Fragen gefunden (prüfe Feldnamen).');
      return;
    }

    // Array für Navigation
    const questions = [...questionMap.entries()];
    let index = 0;
    const state = { questions, index };

    const embed = buildEmbed(state);
    const row = buildButtons();

    const msg = await interaction.editReply({ embeds: [embed], components: [row] });

    // Buttons-Collector
    const collector = msg.createMessageComponentCollector({ time: 5 * 60_000 });

    collector.on('collect', async (btn) => {
      if (btn.customId === 'next') {
        state.index = (state.index + 1) % questions.length;
      } else if (btn.customId === 'prev') {
        state.index = (state.index - 1 + questions.length) % questions.length;
      }
      const newEmbed = buildEmbed(state);
      await btn.update({ embeds: [newEmbed], components: [row] });
    });

    collector.on('end', async () => {
      await msg.edit({ components: [] }).catch(() => {});
    });
  } catch (err) {
    console.error('Fehler bei /auswertung:', err);
    await interaction.editReply('❌ Fehler beim Laden der Umfrage-Daten.');
  }
});

// ---------- Hilfsfunktionen ----------

function buildEmbed(state) {
  const [question, answers] = state.questions[state.index];

  const counts = {};
  for (const a of answers) {
    counts[a] = (counts[a] || 0) + 1;
  }

  const total = answers.length;
  const chart = Object.entries(counts)
    .map(([ans, cnt]) => {
      const pct = (cnt / total) * 100;
      const bar = '▉'.repeat(Math.round(pct / 5));
      return `${ans.padEnd(20)} ${bar} ${pct.toFixed(1)}%`;
    })
    .join('\n');

  return new EmbedBuilder()
    .setTitle(`📊 ${question}`)
    .setDescription('```' + chart + '```')
    .setColor(0x4e9af1)
    .setFooter({
      text: `Frage ${state.index + 1}/${state.questions.length} • ${total} Antworten`,
    })
    .setTimestamp();
}

function buildButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('prev')
      .setStyle(ButtonStyle.Secondary)
      .setLabel('◀️ Zurück'),
    new ButtonBuilder()
      .setCustomId('next')
      .setStyle(ButtonStyle.Secondary)
      .setLabel('Weiter ▶️')
  );
}

client.login(process.env.DISCORD_TOKEN);
