module.exports = function(grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt)

  // Configure Grunt
  grunt.initConfig({
    //it will allow to run nodemon and watch at the same time
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    compass: {
      dev: {
        config: 'config.rb'
      }
    },
    //configure nodemon to restart when files are changed
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          ignore: ['node_modules/**'],
          ext: 'js,scss,css,handlebars,html',
          nodeArgs: ['--debug'],
          env: {
            PORT: '3000'
          },
          // omit this property if you aren't serving HTML files and
          // don't want to open a browser tab on start
          callback: function(nodemon) {
            nodemon.on('log', function(event) {
              console.log(event.colour)
            })

            // opens browser on initial server start
            nodemon.on('config:update', function() {
              // Delay before server listens on port
              setTimeout(function() {
                require('open')('http://localhost:3000')
              }, 1000)
            })

            // refreshes browser when server reboots
            nodemon.on('restart', function() {
              // Delay before server listens on port
              setTimeout(function() {
                require('fs').writeFileSync('.grunt/rebooted', 'rebooted')
              }, 1000)
            })
          }
        }
      }
    },
    watch: {
      //it must be used to run express before the livereload task
      server: {
        files: ['.grunt/rebooted'],
        options: {
          livereload: true
        }
      },
      compass: {
        // These files are sent to the live reload server
        files: ['public/stylesheets/**/*.scss', 'public/stylesheets/*.scss'],
        tasks: ['compass'],
        livereload: true
      },
    }
  })

  grunt.registerTask('default', ['concurrent:dev'])
}