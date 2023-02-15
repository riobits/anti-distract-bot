import 'dotenv/config'
import { ChannelType, Client, GatewayIntentBits } from 'discord.js'
import formatDuration from './utils/formatDuration'

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
})

const token = process.env.TOKEN!

client.on('ready', () => {
  console.log(`Logged in as ${client.user!.tag}!`)
})

client.on('interactionCreate', async (interaction) => {
  if (
    !interaction.isChatInputCommand() ||
    interaction.channel!.type === ChannelType.DM
  )
    return

  if (interaction.commandName === 'start') {
    const userId = interaction.user.id
    const member = interaction.guild!.members.cache.get(userId)!
    const vChannel = member.voice.channel

    if (!vChannel) {
      await interaction.reply('> 🚨 You should join a voice channel first')
      return
    }

    const min = interaction.options.getNumber('min')!
    const durationStr = formatDuration(min)

    setTimeout(() => {
      vChannel.members.forEach((member) => {
        member.voice.disconnect('Playing time is done, go work!')
      })
    }, min * 1000 * 60)

    const message = `> Started timer, members in \`${vChannel.name}\` will get kicked after ${durationStr} :alarm_clock:`

    await interaction.reply(message)
  }
})

client.login(token)
