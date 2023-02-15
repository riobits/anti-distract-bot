import 'dotenv/config'
import { REST, Routes, SlashCommandBuilder } from 'discord.js'

const token = process.env.TOKEN!
const clientId = process.env.CLIENT_ID!

const startCommand = new SlashCommandBuilder()
  .setName('start')
  .setDescription('kick all voice chat members after specific time')
  .addNumberOption((option) =>
    option
      .setName('min')
      .setDescription('set time (in minutes)')
      .setMinValue(1)
      .setRequired(true)
  )

const commands = [startCommand]

const rest = new REST({ version: '10' }).setToken(token)

const registerCommands = async () => {
  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(Routes.applicationCommands(clientId), { body: commands })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}

registerCommands()
