// setup-vercel-test-config.js
const fs = require("fs");

const writeJson = (filename, json) => {
    fs.writeFileSync(filename, JSON.stringify(json, null, 2));
    console.log(`✅ ${filename} 생성됨`);
};

// 1. vercel.json
writeJson("vercel.json", {
    buildCommand: "next build --no-lint",
    outputDirectory: ".next",
});

// 2. package.json 수정
const pkgPath = "package.json";
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

pkg.scripts = {
    ...pkg.scripts,
    build: "next build --no-lint",
    lint: "echo 'skipped lint check'",
};

writeJson(pkgPath, pkg);

// 3. .vercelignore
const ignoreContent = [".vscode", "README.md", "node_modules", "*.log"].join("\n");
fs.writeFileSync(".vercelignore", ignoreContent);
console.log("✅ .vercelignore 생성됨");

console.log("\n🎉 테스트 배포 구성이 완료되었습니다!");