const Metalsmith = require('metalsmith'),
      markdown = require('metalsmith-markdown'),
      layouts = require('metalsmith-layouts'),
      permalinks = require('metalsmith-permalinks'),
      assets = require('metalsmith-assets'),
      partials = require('metalsmith-discover-partials'),
      helpers = require('metalsmith-register-helpers'),
      collections = require('metalsmith-collections');

module.exports = Metalsmith(__dirname)
  .metadata({
    title: "The Peoples Champ",
    description: "The undisputed champion of the people.",
    url: "https://peopleschamp.io"
  })
  .source('./../../content/pages')
  .destination('./../../build')
  .clean(true)
  .use(helpers({
    directory: './../../lib/helpers'
  }))
  .use(partials({
    directory: './../../templates/partials'
  }))
  .use(markdown())
  .use(permalinks())
  // .use(collections())
  .use(layouts({
    directory: './../../templates/layouts',
    default: 'default.hbs',
    suppressNoFilesError: true,
    engineOptions: {
      cache: false
    }
  }))
  .use(assets({
    source: './../../content/static'
  }))