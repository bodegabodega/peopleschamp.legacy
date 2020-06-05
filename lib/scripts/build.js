const Metalsmith = require('metalsmith'),
      markdown = require('metalsmith-markdown'),
      layouts = require('metalsmith-layouts'),
      permalinks = require('metalsmith-permalinks'),
      assets = require('metalsmith-assets'),
      partials = require('metalsmith-discover-partials'),
      helpers = require('metalsmith-register-helpers'),
      collections = require('metalsmith-collections'),
      tags = require('metalsmith-tags'),
      preserve = require('./../plugins/preserve'),
      tagColorizer = require('./../plugins/tag-colorizer');

module.exports = environment => {
  return Metalsmith(__dirname)
    .metadata({
      title: "The Peoples Champ",
      description: "The undisputed champion of the people.",
      url: "https://peopleschamp.io",
      environment
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
    .use(collections({
      tracks: {
        pattern: 'track/*.md'
      }
    }))
    .use(markdown())
    .use(preserve())
    .use(permalinks())
    .use(tags({
      "path": "tracks/tagged/:tag/index.html",
      "layout": "tracks_tagged.hbs",
    }))
    .use(tagColorizer())
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
}