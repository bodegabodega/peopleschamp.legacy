const debug = require('debug')('template-plugin'),
      slug = require('slug'),
      distinctColors = require('distinct-colors').default;

module.exports = options => {
  const defaults = {
    sensible: 'default'
  }
  const settings = Object.assign({}, defaults, options);
  return (files, metalsmith, done) => {
    let meta = metalsmith.metadata();
    let tagColors = [];
    let count = 0;
    for (const key in meta.tags) {
      let tagColor = {
        name: key,
        slug: slug(key, {
          "mode": "rfc3986"
        })
      }
      tagColors.push(tagColor)
      count++;
    }
    const colors = distinctColors({
      lightMax: 80,
      chromaMin: 60,
      count
    })
    colors.forEach((color, index) => {
      tagColors[index].hex = color.hex()
    })
    meta.tagColors = tagColors;
    files['css/colors.css'] = {
      contents: Buffer.from(''),
      tagColors,
      layout: 'empty.hbs'
    }
    setImmediate(done);
  }
}