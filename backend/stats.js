const fs = require('fs');
const path = require('path');

const CHALLENGE_PATTERN = /^\d{2} - /;
const EXCLUDED = ["stats.js", "stats.json", "ejercicio.md", ".ds_store", "tempcoderunnerfile.js"];

const currentPath = __dirname;

let challenges = {};
let currentChallenge = "";
let languages = {};
let users = {};
let filesTotal = 0;

const walkSync = (dir, callback) => {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            callback(filePath, true);
            walkSync(filePath, callback);
        } else {
            callback(filePath, false);
        }
    });
};

walkSync(currentPath, (filePath, isDir) => {
    const dirName = path.basename(path.dirname(filePath));
    const fileName = path.basename(filePath).toLowerCase();

    if (isDir) {
        if (CHALLENGE_PATTERN.test(path.basename(filePath))) {
            currentChallenge = path.basename(filePath);
        }
    } else {
        if (!EXCLUDED.includes(fileName)) {
            const language = dirName.toLowerCase();
            languages[language] = (languages[language] || 0) + 1;

            const user = path.parse(fileName).name.toLowerCase();
            if (!users[user]) {
                users[user] = { count: 0, languages: new Set() };
            }

            users[user].count += 1;
            users[user].languages.add(language);

            filesTotal += 1;

            if (currentChallenge) {
                challenges[currentChallenge] = (challenges[currentChallenge] || 0) + 1;
            }
        }
    }
});

const sortDescending = (obj, valueExtractor = (v) => v) => {
    return Object.entries(obj).sort((a, b) => valueExtractor(b[1]) - valueExtractor(a[1]));
};

const sortedChallenges = sortDescending(challenges);
const sortedLanguages = sortDescending(languages);
const sortedUsers = sortDescending(users, (u) => (u.count * 1000) + u.languages.size);

const challengesTotal = sortedChallenges.length;
const languagesTotal = sortedLanguages.length;
const usersTotal = sortedUsers.length;

const formatRanking = (data, extraProps = (item) => ({})) => {
    return data.map(([name, value], index) => ({
        order: index + 1,
        name,
        count: value.count || value,
        ...extraProps(value)
    }));
};

const challengesRanking = formatRanking(sortedChallenges);
const languagesRanking = formatRanking(sortedLanguages, (count) => ({
    percentage: ((count * 100) / filesTotal).toFixed(2)
}));
const usersRanking = formatRanking(sortedUsers, (user) => ({
    languages: user.languages.size
}));

const data = {
    challenges_total: challengesTotal,
    languages_total: languagesTotal,
    files_total: filesTotal,
    users_total: usersTotal,
    challenges_ranking: challengesRanking,
    languages_ranking: languagesRanking,
    users_ranking: usersRanking
};

console.log("ESTADÍSTICAS:\n");
console.log(`Retos: ${challengesTotal}`);
console.log(`Lenguajes de programación: ${languagesTotal}`);
console.log(`Correcciones: ${filesTotal}`);
console.log(`Usuarios: ${usersTotal}`);

console.log("\nRanking de retos:");
challengesRanking.forEach(({ order, name, count }) => {
    console.log(`#${order} ${name} (Ejercicios: ${count})`);
});

console.log("\nRanking de lenguajes:");
languagesRanking.forEach(({ order, name, count, percentage }) => {
    console.log(`#${order} ${name} (Ejercicios: ${count}) (Porcentaje: ${percentage}%)`);
});

console.log("\nRanking de usuarios:");
usersRanking.forEach(({ order, name, count, languages }) => {
    console.log(`#${order} ${name} (Ejercicios: ${count}) (Lenguajes: ${languages})`);
});

fs.writeFileSync(path.join(currentPath, 'stats.json'), JSON.stringify(data, null, 4));

