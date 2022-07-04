const ds = require('discord.js')
const fs = require('fs')
require('dotenv').config()

const client = new ds.Client({
    intents: [ds.Intents.FLAGS.GUILD_MESSAGES, ds.Intents.FLAGS.GUILDS]
})

client.once('ready', () => {
    console.log(`${client.user.tag} is running now!`)
})

client.on('messageCreate', async m => {
    if (m.content.trim() == '-clean') {
        let content = await m.channel.messages.fetch({limit: 150})
        let content2 = JSON.stringify(content)
        content.forEach(msg => {
            try {
                m.channel.messages.delete(msg.id)
            } catch (e) {
                console.error(e)
            }
        })
        await fs.writeFile('./logs/messageHistory.txt', content2, err => {
            if (err) {
                console.log('Error occured \n' + err)
            }
            console.log('Written')
        })
    }
})

client.login(process.env.TOKEN)