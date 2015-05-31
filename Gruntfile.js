// build script for the client-side file
// TODO - LOCALIZATION NOT DONE YET! [redaktor fork changes]
module.exports = function(grunt) {
	var lang = 'en';
	var cMainPath = './client_side/nlp.js';
	var cZipPath = './client_side/nlp.zip.js';
	var cMinPath = './client_side/nlp.min.js';
	
	var dSrcPath = './src/data/';
	var dPath = dSrcPath+lang+'/';
	var pPath = './src/parents/';
	var mPath = './src/methods/';
	
  var files = [
    // helpers
    dPath+'helpFns.js',
    // lexicon data
    dPath+'multiples.js',
    dPath+'verbs_conjugate.js',
    dPath+'verbs_special.js',
    dPath+'verbs.js',
    dPath+'nouns_inflect.js',
    dPath+'nouns.js',
    dPath+'adjectives_decline.js',
    dPath+'adjectives_demonym.js',
    dPath+'adjectives.js',
		dPath+'adverbs_decline.js',
    dPath+'abbreviations.js',
    dPath+'honorifics.js',
    dPath+'dates.js',
    dPath+'numbers.js',
    dPath+'firstnames.js',
    // rules and schema
    dPath+'pos_data.js',
    dPath+'negate_data.js',
    dPath+'word_rules.js',
    dPath+'verb_rules.js',
    dPath+'normalisations.js',
    dPath+'suffixes.js',
		
    dPath+'schema.js',
    // methods
    mPath+'tokenization/sentence.js',
    mPath+'tokenization/ngram.js',
    mPath+'tokenization/tokenize.js',
    mPath+'transliteration/unicode_normalisation.js',
    mPath+'syllables/syllable.js',
    mPath+'localization/britishize.js',
    // values
    pPath+'value/to_number.js',
    pPath+'value/date_extractor.js',
    pPath+'value/index.js',
    // nouns
    pPath+'noun/indefinite_article.js',
    pPath+'noun/conjugate/inflect.js',
    pPath+'noun/index.js',
    // adverbs
    pPath+'adverb/conjugate/to_adjective.js',
    pPath+'adverb/index.js',
    // verbs
    pPath+'verb/conjugate/to_doer.js',
    pPath+'verb/conjugate/conjugate.js',
    pPath+'verb/index.js',
    // adjectives
    pPath+'adjective/conjugate/to_noun.js',
    pPath+'adjective/conjugate/to_comparative.js',
    pPath+'adjective/conjugate/to_superlative.js',
    pPath+'adjective/conjugate/to_adverb.js',
    pPath+'adjective/index.js',
		
    './src/data/lexicon/phrasal_verbs.js', // TODO
    pPath+'parents.js',
    dPath+'lexicon.js',
		
    './src/sentence.js',
    './src/section.js',
    './src/pos.js',
    './src/spot.js',
    //pull it all together..
    './index.js'
  ];
	
	// generate all language dependent data modules first ...
	require(dSrcPath+'_build')();
	
	// use minimized files for uglify
	var filesCompressed = files.map(function(p) {
		var zipP = p.replace('.js', '.min.js');
		return (grunt.file.exists(zipP)) ? zipP : p;
	});
	
  // project configuration ...
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
			
    concat: {
      options: {
        banner: '/*! <%= pkg.name %>  <%= pkg.version %>  by @spencermountain <%= grunt.template.today("yyyy-mm-dd") %>  <%= pkg.license%> */\nvar nlp = (function() {\n',
				process: function(src, filepath) {
					// remove node.js only and trailing whitespace
          return src.replace(/^.*\/\/::NODE::[\s\S]*?.*[\s\S]*?\/\/::.*?$/gm, '').replace(/[ \t]+$/gm, '');
        },
        footer: "\nreturn nlp;\n})()"
      },
      dist: {
        src: files,
        dest: cMainPath,
        nonull: true
      },
			zip: {
        src: filesCompressed,
        dest: cZipPath,
        nonull: true
      }
    },
		
    uglify: {
      do :{
        src: [cZipPath],
        dest: cMinPath
      },
      options: {
        preserveComments: false,
        mangle: true,
        banner: ' /*nlp_comprimise by @spencermountain in 2015*/\n',
        compress: {
          drop_console: true,
          dead_code: true,
          properties: true,
          unused: true,
          warnings: true
        }
      }
    },

    jscs: {
      all: [cMainPath],
      options: {
        requireCurlyBraces: true,
        disallowMixedSpacesAndTabs: true,
        disallowEmptyBlocks: true,
        disallowFunctionDeclarations: true,
        disallowImplicitTypeConversion: ['numeric', 'boolean', 'binary', 'string'],
        requireAnonymousFunctions: true,
        requireOperatorBeforeLineBreak: true,
        disallowTrailingWhitespace: true
        //disallowTrailingComma:true
      }
    },

    jshint: {
      options: {
        globals: {
          module: true,
          require: true,
          exports: true
        },
        boss:true, // double equals
        asi: true, //semicolons
        sub: true, //dot notation
        devel: true //console.log
      },
      afterconcat: [cMainPath]
    }

  });
  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
	
	grunt.registerTask('cleanup', 'Remove compressed files. They were concat to nlp.min.js', function() {
		filesCompressed.forEach(function(p){
    	if (p.indexOf(dPath) > -1 && p.indexOf('.min.js') > 1) grunt.file.delete(p);
		});
		grunt.file.delete(cZipPath);
	});
	
  grunt.registerTask('default', ['concat', 'jscs', /*'jshint',*/ 'uglify', 'cleanup']);
};
