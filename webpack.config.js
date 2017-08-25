var path = require('path')
var SpritesmithPlugin = require('webpack-spritesmith')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devtool: 'eval-source-map',
  entry: resolve('/src/js/index.js'),
  output: {
    path: resolve('/public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new SpritesmithPlugin({
      // 目标小图标
      src: {
        cwd: resolve('/src/assets/images/icons'),
        glob: '*.png'
      },
      // 输出雪碧图文件及样式文件
      target: {
          image: resolve('/public/images/sprites/sprite.png'),
          css: resolve('/public/images/sprites/sprite.css')
      },
      // 样式文件中调用雪碧图地址写法
      apiOptions: {
          cssImageRef: './sprite.png'
      },
      spritesmithOptions: {
          algorithm: 'top-down'
      }
    })
  ],
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    inline: true
  } 
}