import { DataTypes, Sequelize } from "sequelize"

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    dialectOptions: {
        mysql2: true
    }
})

export const ShorlinksModel = sequelize.define("shortlinks", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    shorturl: { type: DataTypes.STRING(20), unique: true },
    url: { type: DataTypes.STRING(2000), unique: true }
})

