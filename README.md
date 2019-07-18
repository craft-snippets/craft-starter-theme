{% verbatim %}
# Introduction

This is a starter theme for Craft CMS - it can be used as scaffolding for any project. It consists of:

* Boilerplate Twig files
* Base CSS code with [Bulma](https://bulma.io/) framework included. Can be pretty opinionated.
* Gulp config for compiling JS and CSS assets and running browsersync
* Few useful Craft config settings

This document describes each part of the starter theme - how it works and why specific solutions or approaches were used. It can also be read as a guide for structuring Craft CMS project.

# Installation

Clone files from the Github repository, open console and run `composer install` and `craft setup`. You can also just copy template or SCSS and gulp files to your already existing project.

# Template files

Templates files are divided into four main directories: **layouts**, **pages**, **components**, and **system**. Each directory name is prepended with `_` - otherwise, Craft would make accessing them directly by [entering their filenames as URL](https://docs.craftcms.com/v3/routing.html) possible. There is also `_404` file that is used in case of 404 error.

## Layouts

This directory contains base HTML code of website. 

**base.twig**

Main template file. It is used by every page existing on the website thanks to use of `{% extends %}` and `{% block %}` tags.  
* `<html>` tag has `lang` attribute with value automatically taken from locale of the current site. It tells screen readers how they should read text on page. It can also influence font rendering in some cases. It, however [does not tell Google about the language of your website](http://www.thesempost.com/google-ignores-html-lang-tag-indexing-search-results/).
* `<html>` tag has also `dir` attribute, with value also automatically taken from locale of the current site. In case of right-to-left languages, it will tell browser to render text accordingly.
*  `<body>` can have `is-mobile` or `is-desktop` class. This does not depend on screen width but a browser user agent. Remember to **do not** use this class in your CSS if your whole website or fragment of your website containing `<body>` tag is cached.
* You can give `<body>` page-specific class by setting variable `body_class` in page template file.
* `head` block can be used by pages to append something to `<head>` section of website. `endBody` block can be used to append something to end of `<body>`.
* At the beginning of the file there is HTML comment containing author info - feel free to remove it if you wish.

**layout_main.twig**

This file contains basic markup scaffolding for your pages. Single pages extend this file while this file extends `base.twig`.

By default, there is one layout file, but you can have multiple. For example -  layout with right column, layout with left and right column, layout without columns.

`layout_main` contains a few useful HTML containers that help with positioning your content:

* `l-main`, `l-outside-footer` and `l-footer-fixed` - thanks to flexbox, your footer will always stick to the bottom of the page, even if there is no content to push it from the top. [Here](https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/) you can learn how it works in details.
* `l-external-container` - this container contains all content of the website. Sometimes you don't wish for your website to stretch indefinitely to full width on all screen sizes, especially when you use background images that would look bad on larger screens - like 4000px width ones. That's why I gave `l-external-container` width slightly larger than the most popular widescreen width - 2100px.

## System

This directory contains files that don't output HTML visible for website visitors but handle the technical side of things. 

* `favicons.twig` - this file generates favicons from image uploaded through the control panel. Learn more in [this article](http://craftsnippets.com/articles/adding-favicons-to-craft-cms-website).
* `fonts.twig` - a place for you to place links to google fonts or font icon packs like font awesome.
* `macros` - file containing Twig macros. There are few useful macros already defined there - macros for [truncating text](http://craftsnippets.com/articles/truncating-text-with-twig-macros-in-craft-cms) and macro [turning email addresses in text into links](http://craftsnippets.com/articles/converting-email-addresses-into-links-using-twig-macro).
* `meta.twig` - various meta tags. Encoding settings, viewport settings.  `format-detection` disables automatic transforming phone numbers into links on Safari and Edge. `theme-color` takes care of browser header color on android Chrome - color value is taken from `config/general.php` setting and tag won't be rendered if this setting is not defined.
* `seo` - basic SEO code that takes care of `<title>` tag. Automatically disabled if seomatic plugin is installed. Title is constructed like this: "entry/category name - site name". Home page does not have site name appended.
* `static` - list of static files (scripts and styles). File paths are placed in an array. Depending of type of file, `registerJsFile` and `registerCssFile` will place them in proper places - styles in `<head>` and scripts at the end of `<body>`. You can also include files from CDN here. If devmode is disabled, minified files generated by gulpfile are included instead.

## Pages

Files specific to single pages of website - sections and category groups. By default, there is a directory and file for **home** section.

Few rules about how you should structure your pages files:

* Each directory inside `pages` should represent single section (or category group). Folder name should be same as section handle.
* Inside directory of a single section, there should be one **main file** with name same as a directory. It extends specific **layout** (and in turn, layout extends `_layouts/base.twig` file). In this file, you can set `body_class` variable that will add page-specific class to `<body>` of website.
* Most pages can be divided by parts - for example, the homepage can contain parts like "about us", "latest news", "our crew", "contact". Each of these parts should live in a separate file, and each of these files should be included in the main file of page. 
* Page parts filenames should be constructed like this: `sectionHandle_pagePart`. So for example: "home_about", "home_news" etc.
* Each part of page should we wrapped in `<section>` tag. If you don't want section contents to stretch to the full width of the screen, you can wrap them with div with `container` class - like in `home_example.twig` file. This class is provided by [Bulma framework](https://bulma.io/documentation/layout/container/) which is included in SCSS files.


## Components

This directory contains reusable components that are used in multiple fragments of the website. Some of most useful components are there already - [breadcrumbs](http://craftsnippets.com/articles/breadcrumb-created-from-url-for-craft-cms), [pagination](http://craftsnippets.com/articles/ellipsis-pagination-component-for-craft-cms) and [quick edit link](http://craftsnippets.com/articles/quick-edit). There is also a footer file.

# Styles

SCSS files are located in `web/static/styles`. 

**main.scss**

The only file without `_` prepending its name, meaning that it will be only one that will be compiled by gulp - into `web/static/main.css`. This file imports all other files and should not directly contain any styling. Order of included files is important. First libraries should be included, then your own files styling various part of the website - so they can overwrite values set up by libraries thanks to CSS specificity. Last on the list, there should be `_temp.scss` file that should be able to overwrite all previous files.

Two libraries are included into `main.scss` - Bulma and normalize CSS. Before Bulma includes, `$gap` variable is set to set proper values of Bulma columns and breakpoints.

**_temp.scss**

A file meant for quick or temporary fixes. It's included at end of `main.scss` to overwrite anything else.

**_classes.scss**

Global classes are settings for some common HTML elements. Few of these settings are already here, for example, default cursor for the website.

## Base directory

Files in this directory set basic settings for whole project.

**_mixins.scss**

A file that should contain SCSS mixins. By default, it contains one mixin - used for setting cross-browser selection color.

**_reset.scss**

Highly opinionated CSS reset.

**_structure.scss**

Classes used to give a basic structure to the webpage - fixed footer and external container (described in this document in the section about layout templates)

**_variables.scss**

A file containing SCSS variables.

**_z-index.scss**

This file contains SCSS function allowing you to set all  `z-index` values in one file. Every gave anything z-index of 9999999 to overwrite all other values? Keeping track of z-indexes in one file allows you to avoid it.

## Plugins directory

This directory contains SCSS plugins. By default, Bulma and normalize CSS are located here.

## Pages directory

This directory should be analogous to `pages` directory in templates. Each page should have its own subdirectory and each file in this subdirectory should have the same name as the corresponding file in templates. Thanks to that, you will be able to quickly find CSS code for a specific part of the site.

## Components directory

Just like witch pages, this directory should be analogous to `components` directory in templates.

# Gulpfile

Gulpfile handles SCSS compilation and minification, JS minification and [browsersync](https://www.browsersync.io/).

## Gulp dev

Running `gulp dev` (or just `gulp` as a shortcut) command will compile your SCSS to single CSS file `web/static/main.css` and run browsersync.

## Browsersync

Browsersync updates your website with CSS changes you make, without refreshing page. It also allows synchronizing multiple browsers, on multiple devices. To learn about the basic functionality of browsersync you can watch [this video tutorial](https://webdesign.tutsplus.com/tutorials/a-quick-introduction-to-browsersync--cms-22135).

Browsersync config in gulpfile is tailored to [Xampp](https://www.apachefriends.org/pl/index.html) working on windows.

Config assumes that your website is located in `htdocs` directory and public directory of your website is named `web` - just like it is by default. After running gulp, website will open in the default browser, on port 4000. If you change one of Twig files in `templates` directory, website will be hard-reloaded. Modifying SCSS files in `web/static/styles` directory will update the website without reloading.

## Minifying for production

Running `gulp prod` will concatenate and minify all JS files and do the same with CSS files. Filepaths of your files need to be placed in gulpfile manually.

## Error handling

In case of errors, (like SCSS syntax errors) gulp will use windows push notification service to show an error message, with file name and line number where error occurred specified. Thanks to that you don't need to keep your console opened to keep track of this information.

# Config settings

Starter project has few useful config variables already set.

* `'errorTemplatePrefix' => '_',` - thanks to that file responsible for 404 error (and other errors) will not be available directly if someone visits "404" URL.
* `theme` - this array is supposed to contain all your custom variables that should be exposed to your Twig files. In twig files they can be retrieved like this: `{{craft.app.config.general.theme.someVariable}}`. One variable is already set (but commented out) - theme color used in `_system/meta.twig` file.
{% endverbatim %}