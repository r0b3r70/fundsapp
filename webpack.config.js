module.exports = {
    entry: ['./src/app.js', './src/style.scss'],
    output: {
      filename: './dist/bundle.js'
      },
      module: {
          loaders: [{
              exclude: '/node_modules/',
              loader: 'babel-loader',
              query: {
                  presets: ['es2015']
              }
          }]
      },
    module: {
      rules: [
              { test: /\.scss$/, 
                  use:[
                      {
                          loader: 'file-loader',
                          options: {
                              name: '[name].css',
                              outputPath: 'dist/'
                          }
                      },
                      { loader: 'extract-loader' },					
                      { loader: 'css-loader' },
                      { loader: 'sass-loader' }					
                  ]
              }
      ]
    }
          
  };