const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUhTL01xa2pQSU03ZnFqaE1GanQweFpqQ2ZUc01WTmpHZTIwTUNHV0IyRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiODFRNndnSHR4ZXU0c3VDSGdiUmlqdjUyRUQwQ1FGSno4MTFhL2QzZElUMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTT1oxSXg0VU85bTBzU1FlTWdWY29EVE1BWk9FdE95UEx3UWwxWCswaFcwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIdUVGT2hxTkMzalg1M2lRMG9vcHlxMnZ3QzkrQUxsTHIvVkd2RnlnSkdZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlFTDhYNUdIcmlFU3lMd2tDblIrL1l0TFZxd2dSbmpiR1hkU0l3TFF0R289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ill3WDA2anVLUjc3NmFRYUJpS3BTU2toS2lXRWtVR1BkYnZ5NlRHaTFtMms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ05iRndoaFZvNndYdktuTTB6Z0FrbTVMRHJQbkpMeHJDMHk0SFNUQ0JrTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMDdnRU5GcmJKZ0ZpKzVZdEZnWHdFRXJ0bUZYZmtwSmdiNkY2TmtmRXZ5TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik0zckJiYzZoQkVPL1BBMERJMmdJWkw1bTRBaVVlaE1sdW5HQlBDeDljNmgyYlJsYlZaYnhjRVQ2ekxQa1FFeFBvOTR1ZU1VOE43ZDVwbU1DcHBTQkNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIsImFkdlNlY3JldEtleSI6ImhONjJGZEVscXlzVWo4Vyt1OXA2Y0hBQ3NkbUpvTTJMSlNNNWk2ZDFwQVU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzQ1MTE1MTg4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjAzMEFDNDU1QTNCQTBGRTQ5RjBBMTdDOThEREJDOTkwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEwMTM5MjF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc0NTExNTE4OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGRUY5QTRFRDA3NjZDNDNFOUZEMDBGQUZERjY4OUM0RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMDEzOTMwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIxMjNMT1RVUyIsIm1lIjp7ImlkIjoiMjU0NzQ1MTE1MTg4OjQwQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTk2MjExOTIzNTA1MjA1OjQwQGxpZCIsIm5hbWUiOiJIZWFydGJyZWFrZXIg8J+ltSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS0dsM1A0SEVKRzArY0lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRnhidnJRdWtuQTVkbmxVZWlwaUFlU2ZDL21LdTA2aUpLYmxlVXdPVFAxRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNCs1azNZallzZWszVko4M2kwM1MvZXNaZ0lXTko0cVMxY0pCN3FYNG5sYVMvSnp1ekRrV2xiTnV1M3FUUmY3ekN4Y2hlNTBzUTJadkREcU43NkFtQmc9PSIsImRldmljZVNpZ25hdHVyZSI6InVZWUdoa2I3RklZQ1RPNXA0VkdnY1A0TzBqdjY4ckMrVzFMZGg0b05YMWszQUovdjNndDFoWFU4clQ4RTlEUjJoTEg2RjB3UC9FbllETUlBNjNaT0FBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzQ1MTE1MTg4OjQwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJjVzc2MExwSndPWFo1VkhvcVlnSGtud3Y1aXJ0T29pU201WGxNRGt6OVIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTAxMzkxOSwibGFzdFByb3BIYXNoIjoiM1I5WjM5IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHT1cifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "CALLY",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254745115188",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'CALLY-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'recording',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

