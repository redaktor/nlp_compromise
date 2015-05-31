// build script for the client-side file
module.exports = function(grunt) {
	// TODO - LOCALIZATION NOT DONE YET! [redaktor fork changes]
	var lang = 'en';
	var C = {
		banner: {
			max: '/*! <%= pkg.name %>  <%= pkg.version %>  by @spencermountain <%= grunt.template.today("yyyy-mm-dd") %>  <%= pkg.license%> */\n',
			min: 	' /*nlp_comprimise by @spencermountain in 2015*/\n'
		},
		path: {
			data: './src/data/',
			parents: './src/parents/',
			methods: './src/methods/',
			main: './client_side/nlp.js',
			zip: './client_side/nlp.zip.js',
			min: './client_side/nlp.min.js'
		}
	};
	C.path.nls = C.path.data+lang+'/';
	
  var files = [
    // helpers
    C.path.nls+'helpFns.js',
    // lexicon data
    C.path.nls+'multiples.js',
    C.path.nls+'verbs_conjugate.js',
    C.path.nls+'verbs_special.js',
    C.path.nls+'verbs.js',
    C.path.nls+'nouns_inflect.js',
    C.path.nls+'nouns.js',
    C.path.nls+'adjectives_decline.js',
    C.path.nls+'adjectives_demonym.js',
    C.path.nls+'adjectives.js',
		C.path.nls+'adverbs_decline.js',
    C.path.nls+'abbreviations.js',
    C.path.nls+'honorifics.js',
    C.path.nls+'dates.js',
    C.path.nls+'numbers.js',
    C.path.nls+'firstnames.js',
    // rules and schema
    C.path.nls+'pos_data.js',
    C.path.nls+'negate_data.js',
    C.path.nls+'word_rules.js',
    C.path.nls+'verb_rules.js',
    C.path.nls+'normalisations.js',
    C.path.nls+'suffixes.js',
		
    C.path.nls+'schema.js',
    // methods
    C.path.methods+'tokenization/sentence.js',
    C.path.methods+'tokenization/ngram.js',
    C.path.methods+'tokenization/tokenize.js',
    C.path.methods+'transliteration/unicode_normalisation.js',
    C.path.methods+'syllables/syllable.js',
    C.path.methods+'localization/britishize.js',
    // values
    C.path.parents+'value/to_number.js',
    C.path.parents+'value/date_extractor.js',
    C.path.parents+'value/index.js',
    // nouns
    C.path.parents+'noun/indefinite_article.js',
    C.path.parents+'noun/conjugate/inflect.js',
    C.path.parents+'noun/index.js',
    // adverbs
    C.path.parents+'adverb/conjugate/to_adjective.js',
    C.path.parents+'adverb/index.js',
    // verbs
    C.path.parents+'verb/conjugate/to_doer.js',
    C.path.parents+'verb/conjugate/conjugate.js',
    C.path.parents+'verb/index.js',
    // adjectives
    C.path.parents+'adjective/conjugate/to_noun.js',
    C.path.parents+'adjective/conjugate/to_comparative.js',
    C.path.parents+'adjective/conjugate/to_superlative.js',
    C.path.parents+'adjective/conjugate/to_adverb.js',
    C.path.parents+'adjective/index.js',
		
    './src/data/lexicon/phrasal_verbs.js', // TODO FIXME
    C.path.parents+'parents.js',
    C.path.nls+'lexicon.js',
		
    './src/sentence.js',
    './src/section.js',
    './src/pos.js',
    './src/spot.js',
    //pull it all together..
    './index.js'
  ];
	
	// generate all language dependent data modules first ...
	require(C.path.data+'_build')();
	
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
        banner: (C.banner.max + 'var nlp = (function() {\n'),
				process: function(src, filepath) {
					// remove node.js only and trailing whitespace
          return src.replace(/^.*\/\/::NODE::[\s\S]*?.*[\s\S]*?\/\/::.*?$/gm, '').replace(/[ \t]+$/gm, '');
        },
        footer: "\nreturn nlp;\n})()"
      },
      dist: {
        src: files,
        dest: C.path.main,
        nonull: true
      },
			zip: {
        src: filesCompressed,
        dest: C.path.zip,
        nonull: true
      }
    },
		
    uglify: {
      do :{
        src: [C.path.zip],
        dest: C.path.min
      },
      options: {
        preserveComments: false,
        mangle: true,
        banner: C.banner.min,
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
      all: [C.path.main],
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
      afterconcat: [C.path.main]
    }

  });
  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
	
	grunt.registerTask('cleanup', 'Remove compressed files. They were concat and minimized in nlp.min.js', function() {
		var minStr = '.min.js';
		filesCompressed.forEach(function(p){
			// delete "zipped" data modules (concated for now)
    	if (p.indexOf(C.path.nls) > -1 && (p.length-minStr.length) === p.indexOf(minStr)) grunt.file.delete(p);
		});
		// delete "zipped" concat file (minimized now)
		//grunt.file.delete(C.path.zip);
		grunt.log.writeln('File'['white'], './client_side/nlp.min.js'['cyan'], 'was created before. Now tidy. '['white']).ok();
	});
	
  grunt.registerTask('default', ['concat', 'jscs', /*'jshint',*/ 'uglify', 'cleanup']);
};
