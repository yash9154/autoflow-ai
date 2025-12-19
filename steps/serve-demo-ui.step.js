import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read HTML file once at startup
const htmlPath = join(__dirname, '..', 'public', 'index.html');
let htmlContent;
try {
    htmlContent = readFileSync(htmlPath, 'utf-8');
} catch (e) {
    htmlContent = '<h1>Demo UI not found</h1>';
}

export default {
    config: {
        name: "ServeDemoUI",
        type: "api",
        description: "Serves the demo UI page",
        path: "/demo",
        method: "GET",
        emits: []
    },

    handler: async (req, res) => {
        console.log(`\n🖥️  Serving Demo UI at /demo`);

        return {
            status: 200,
            headers: {
                'Content-Type': 'text/html'
            },
            body: htmlContent
        };
    }
};
