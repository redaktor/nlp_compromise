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
	/*
	-b or --beautify — output indented code; when passed, additional options control the beautifier:
-i N or --indent N — indentation level (number of spaces)
-q or --quote-keys — quote keys in literal objects (by default, only keys that cannot be identifier names will be quotes).
	*/
	
	// generate all language dependent data modules first ...
	require(C.path.data+'_build')();
	
	// use minimized files for uglify
	/*
	var filesCompressed = files.map(function(p) {
		var zipP = p.replace('.js', '.min.js');
		return (grunt.file.exists(zipP)) ? zipP : p;
	});
	*/
  // project configuration ...
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
		/*	
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
		*/
		
		browserify:{
      client: {
        src: './index.js',
        dest: './client_side/nlp.js',
        options:{
          standalone: true
        }
      }
    },
		browserifyZipped:{
      client: {
        src: './index.min.js',
        dest: './client_side/nlp.js',
        options:{
          standalone: true
        }
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
