import { Command } from 'commander'
import { addCreateCommand, addUpdateCommand } from './commands'

const program = new Command()
program.name('yds')
program.description('Manage Altegio UI components across supported platforms')
program.helpInformation()

const createCommand = addCreateCommand(program)
const updateCommand = addUpdateCommand(program)

program.on(
  '--help',
  () => {
    createCommand.outputHelp()
  },
)

if (!process.argv.slice(2).length) {
  createCommand.outputHelp()
  updateCommand.outputHelp()
} else {
  program.parse(process.argv)
}
