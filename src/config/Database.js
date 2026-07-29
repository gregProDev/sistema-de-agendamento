const mongoose = require("mongoose")

const dns = require("dns")

/*dns.setServers(['8.8.8.8', '8.8.4.4']);*/

async function connectDatabase() {

    try {
        await mongoose.connect(
            process.env.MONGO_URL
        )
        console.log("MongoDb conectado com sucesso")

        console.log("Host", mongoose.connection.host)

        console.log("Database", mongoose.connection.name)

    } catch (error) {
        console.log("Erro ao conectar no mongoDB:", error)
        process.exit(1);
    }
    
}

module.exports = connectDatabase;