const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying build process...');

// Check if dist folder exists
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
    console.log('✅ dist folder exists at:', distPath);
    
    // List contents
    const files = fs.readdirSync(distPath);
    console.log('📁 Contents of dist folder:');
    files.forEach(file => {
        const filePath = path.join(distPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            console.log(`  📁 ${file}/`);
        } else {
            console.log(`  📄 ${file}`);
        }
    });
    
    // Check for index.html
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        console.log('✅ index.html found in dist folder');
    } else {
        console.log('❌ index.html not found in dist folder');
        process.exit(1);
    }
} else {
    console.log('❌ dist folder not found at:', distPath);
    process.exit(1);
}

console.log('🎉 Build verification completed successfully!'); 