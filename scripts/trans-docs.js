import fs from 'fs';
import cpy from 'cpy';
import path from 'path';
import axios from 'axios';
import { glob } from 'glob';
import { removeDir } from './utils.js';

function splitMarkdown(text, maxChars) {
    const parts = [];
    let currentPart = '';
    let buffer = '';
    let inCodeBlock = false;

    const lines = text.split('\n');

    for (let line of lines) {
        if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
        }

        buffer += line + '\n';

        if (!inCodeBlock && buffer.length > maxChars) {
            // 如果当前不在代码块内，且缓冲区字符数超过限制，进行分割
            let splitPoint = buffer.lastIndexOf('\n\n', maxChars);
            if (splitPoint === -1) splitPoint = maxChars;

            currentPart += buffer.substring(0, splitPoint);
            parts.push(currentPart);
            currentPart = '';
            buffer = buffer.substring(splitPoint).trimStart() + '\n';
        }
    }

    // 处理剩余的缓冲区
    currentPart += buffer;
    if (currentPart.trim() !== '') {
        parts.push(currentPart);
    }

    return parts;
}

const translateContent = async (content, targetLanguage) => {
    try {
        const response = await axios.post(
            'https://api.aimu.app/openai/chat',
            {
                content: `Translate the following text to ${targetLanguage}:\n\n${content}`,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 60000,
            },
        );
        return response.data.data;
    } catch (error) {
        console.error('Error during translation:', error);
        return '';
    }
};

const translateMarkdownFiles = async (filePaths, targetLanguage, openAIKey, maxCharsPerRequest) => {
    for (const filePath of filePaths) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const parts = splitMarkdown(content, maxCharsPerRequest);
        console.log('Translating:', filePath);
        console.log('Parts:', parts.length);
        const translatedParts = [];
        for (const part of parts) {
            const translatedPart = await translateContent(part, targetLanguage, openAIKey);
            translatedParts.push(translatedPart);
        }
        const translatedContent = translatedParts.join('');
        fs.writeFileSync(filePath, translatedContent);
    }
};

(async () => {
    const basePath = 'packages/artplayer-vitepress/docs';
    const enPath = 'packages/artplayer-vitepress/docs/en';
    removeDir(enPath);
    cpy(path.resolve(basePath, 'index.md'), path.resolve(enPath));
    const dirs = ['advanced', 'component', 'library', 'plugin', 'start'];
    for (let index = 0; index < dirs.length; index++) {
        const dir = dirs[index];
        await cpy(path.resolve(basePath, dir), path.resolve(enPath, dir), { flat: true });
    }
    const mdsPaths = glob.sync(path.resolve(enPath, '**/*.md'));
    const maxCharsPerRequest = 1024;
    await translateMarkdownFiles(mdsPaths, 'English', maxCharsPerRequest);
})();
