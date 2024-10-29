const fs = require('fs');
const path = require('path');
const dirTree = require('directory-tree');

const frontendDir = './frontend'; // Path to the frontend directory
const backendDir = './backend';   // Path to the backend directory
const outputFile = 'folder_structure.txt'; // Output file

// Options for the directory-tree output
const options = {
  exclude: /node_modules|\.git|\.next/, // Exclude node_modules and .git folders
};

// Generate folder structure for frontend and backend
const frontendTree = dirTree(frontendDir, options);
const backendTree = dirTree(backendDir, options);

// Helper function to format JSON into tree-like text with correct branching symbols
function formatTree(tree, indent = '', isLast = true) {
  const prefix = indent + (isLast ? '└── ' : '├── ');
  let output = `${prefix}${tree.name}\n`;

  if (tree.children) {
    const newIndent = indent + (isLast ? '    ' : '│   ');
    tree.children.forEach((child, index) => {
      const isLastChild = index === tree.children.length - 1;
      output += formatTree(child, newIndent, isLastChild);
    });
  }
  return output;
}

// Format trees and save to file
const frontendTreeFormatted = `Frontend Structure:\n${formatTree(frontendTree)}\n`;
const backendTreeFormatted = `Backend Structure:\n${formatTree(backendTree)}\n`;

fs.writeFileSync(outputFile, frontendTreeFormatted + backendTreeFormatted);

console.log(`Folder structure saved to ${outputFile}`);
