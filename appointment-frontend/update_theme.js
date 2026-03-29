const fs = require('fs');
const path = require('path');

const excludeFiles = ['App.jsx', 'Navbar.jsx', 'Home.jsx', 'Chatbot.jsx', 'index.jsx', 'main.jsx', 'ProtectedRoute.jsx'];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      if (excludeFiles.includes(path.basename(fullPath))) continue;

      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replacements
      content = content.replace(/\bbg-white\b/g, 'bg-slate-800/80 backdrop-blur-md border border-white/10');
      content = content.replace(/\bbg-gray-50\/80\b/g, 'bg-slate-800/80');
      content = content.replace(/\bbg-gray-50\/50\b|\bbg-gray-50\b|\bbg-gray-100\b/g, 'bg-transparent');
      content = content.replace(/\btext-gray-900\b/g, 'text-white font-bold');
      content = content.replace(/\btext-gray-800\b/g, 'text-slate-100 font-semibold');
      content = content.replace(/\btext-gray-700\b/g, 'text-slate-200');
      content = content.replace(/\btext-gray-600\b/g, 'text-slate-300');
      content = content.replace(/\btext-gray-500\b/g, 'text-slate-400');
      content = content.replace(/\bborder-gray-100\b|\bborder-gray-200\b|\bborder-gray-300\b/g, 'border-white/20');
      content = content.replace(/\bhover:bg-gray-50\b|\bhover:bg-gray-100\b/g, 'hover:bg-slate-700/50');
      content = content.replace(/\bring-gray-300\b/g, 'ring-white/20');
      content = content.replace(/border border-white\/10 border border-white\/10/g, 'border border-white/10');
      
      fs.writeFileSync(fullPath, content);
      console.log('Updated: ' + fullPath);
    }
  }
}

processDir(path.join(__dirname, 'src'));
console.log('Done!');
