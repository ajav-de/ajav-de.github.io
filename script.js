function convertMarkdown() {
  const markdown = document.getElementById('markdown-input').value;
  let html = markdown;

  // Headings
  html = html.replace(/^ *(#{1,3}) +(.+)$/gm, (match, hashes, text) => {
    const level = hashes.length;
    return `<h${level}>${text}</h${level}>`;
  });

  // Blockquotes
  html = html.replace(/^ *> +(.+)$/gm, '<blockquote>$1</blockquote>');

  // Italic
  html = html.replace(/(?<!\*)\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/(?<!_)_([^_]+)_/g, '<em>$1</em>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

  // Images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Concat
  html = html.replace(/\n/g, '');

  return html;
}

document.getElementById('markdown-input').addEventListener('input', () => {
  const html = convertMarkdown();
  document.getElementById('html-output').textContent = html;
  document.getElementById('preview').innerHTML = html;
});