# React Webpack Configuration


## Webpack Nedir
Webpack, modern javascript uygulamaları için bir modül paketleyicisidir. Uygulamanızda bulunan her kodu alır ve web tarayıcısında kullanılabilecek bir tek paket oluşturur. Webpack uygulamanızı işlerken, projenizin ihtiyaç duyduğu modülleri haritalandıran ve bir veya daha fazla paket oluşturan bir bağımlılık grafiği oluşturur. Paket, tarayıcı için derlenmiş ve dönüştürülmüş ayrı bir bağlı kod grubudur. Bir dosya diğerine bağımlıysa (ayrı bir dosyadaki kod), Webpack bunu bir bağımlılık olarak değerlendirir. Webpack ayrıca kod harici paketleri (resimler, yazı tipleri, stiller vb.) alır ve bunları uygulamanız için bağımlılıklara dönüştürür.

### Temel Kavramlar
- Entry
- Output
- Loaders
- Plugins
- Mode
- Browser Compatibility

### Entry
Giriş noktasını belirtir. Ön uç projesinin tüm bağımlılıklarının bulunduğu başlangıç noktasıdır. Bir react projenizde giriş dosyası "src/index.js" dir. Webpack için varsayılan giriş noktası "src/index.js" tir. Birden fazla giriş noktasıda belirtilebilmektedir.

### Output
Build işlemi sonrasında javascript ve static dosyaların toplanacağı yerdir. Varsayılan olarak "/dist" klasörüdür.

### Loaders
Webpack için projenizde bulunan çeşitli dosya uzantılarını yükleyebilmesi için kullanılır. Jsx, tsx, txt, css, image, vs. gibi dosyalarını okuyabilmesi için kullanılır. Bu dosyaları projenize bağımlılık olarak eklemektedir.

### Plugins
Eklentiler, bir yükleyici tarafından tamamlanamayan ek görevleri yerine getirir. Buna paket optimizasyonu, ortam değişkenlerini tanımlama vb. şeyler dahildir. Başka bir örnek, tek sayfalık bir web uygulaması için bir stil sayfası çıkarmak veya bir index.html dosyası oluşturmak olabilir.

### Mode
Development, production, none parametrelerini alır. Kendi içerisinde modlara göre optimizasyonları ayarlar. Varsayılan olarak 'production' 'dır. Daha fazla bilgi [için](https://webpack.js.org/configuration/mode/).

### Browser Compatibility
Webpack, ES5 uyumlu bütün tarayıcılarda çalışır. Bunun nedeni import() ve require.insure() için Promise'lere ihtiayaç duymasıdır.

---

### Babel Nedir? 
React'in mevcut sürümü ES6 - ES8 sözdizimini kullanır. Bu sözdizimlerinde yazılan kodu eski tarayıcıların anlayabileceği koda geri derlemek için Babel'e ihtiyaç duyarız. Babel geriye dönük uyumluluk sağlamak için kullanılır.

Artık bir dosya oluşturarak başlayabiliriz. 'react-custom-webpack' isimli bir dosya olusturuyoruz. Ardından initial olarak bir package.json oluşturuyoruz.

```sh
cd react-custom-webpack
yarn init -y
```

Dependecy olarak react, react-dom ve dev-dependecy olarak ilerde kullancağımız babel ve webpack paketlerini kuruyoruz.
```sh
yarn add react react-dom react-router-dom sass
yarn add webpack webpack-cli webpack-dev-server html-webpack-plugin @babel/core @babel/preset-env babel-loader @babel/preset-react babel-plugin-transform-class-properties babel-plugin-transform-es2015-modules-commonjs file-loader url-loader -D
```

Daha sonrasında package.json dosyasını alttaki scripleri ekliyoruz.
```sh
"scripts": {
    "webpack": "webpack",
    "webpack-dev-server": "webpack-dev-server",
    "dev": "npm run webpack-dev-server -- --env mode=development",
    "prod": "npm run webpack -- --env mode=production"
}
 ```
 
 Babel konfigürasyonlarını oluşturmak için ana dizinimize '.babelrc' dosyası olusturuyoruz.
 ```sh
{
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": "last 2 versions"
        },
        "modules": false,
        "loose": false
      }
    ]
  ],
  "plugins": ["transform-class-properties"],
  "env": {
    "test": {
      "plugins": ["transform-es2015-modules-commonjs"]
    }
  }
}
 ```
 - “babel-preset-env” = Tüm kodların ES5 formatına derlenmesini söyler.
 - “babel-preset-react”, jsx desteklemesi için
 - “transform-es2015-modules-commonjs” ve “transform-class-properties” geriye dönük uyumluluk için var

Artık webpack ayarlarına başlayabiliriz. Ana root'a "webpack.config.js" isimli bir dosya olusturuyoruz.

```sh
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
    return {
            mode,
            entry: "./src/index.js",
            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "build"),
                filename: "bundle.js"
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./public/index.html"
                }),
            ]
        }
};
 ```
 
 ### JSX ve Static dosyalar için ayarlar
 ```sh
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
  return {
    mode,
    entry: "./src/index.js",
    devServer: {
      port: 3000,
      historyApiFallback: true,
    },
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
      filename: '[hash].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.jpe?g|png$/,
          exclude: /node_modules/,
          use: ["url-loader", "file-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html"
      }),
    ],
  };
};
 ```
- İlk kural ile image dosyaları okumasını sağlıyoruz.
- İkinci kural ile js ve jsx dosyalarını babel ile okumasını sağlıyoruz.


Artık react uygulamamızı kurabiliriz.
Ana root'a public dosyası olusturuyoruz ve içerisine index.html ekliyoruz.

```sh
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React Custom Webpack</title>
</head>

<body>
  <div id="root"></div>
</body>
</html>
```

Yukarıda bulunan standart html template'ini ekliyoruz.
'src' klasörünü olusturuyoruz ve içerisine index.js ekliyoruz.

```sh
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

Yukarıdaki kodu index.js içerisine ekliyoruz.
App.js ve components klasörlerini oluşturuyoruz.
Uygulamamızda header, homePage ve LazyPage olmak üzere 3 component bulunacaktır. Component klasörü içerisine Header.jsxx, HomePage.jsx ve LazyPage.jsx isimli componentler oluşturalım.

```sh
import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import Header from './components/Header';
const LazyPage = React.lazy(() => import('./components/LazyPage'));

const App = () => {
  return (
    <Router>
        <Header />
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/lazy" component={
              <React.Suspense fallback="...loading">
                  <LazyPage />
              </React.Suspense>
          } />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
```

Yukarıdaki kodu App.jsx içerisine ekliyoruz.

```sh
import React from 'react';

const Header = () => {
    return (
        <div className="header">
            <div>Header</div>
        </div>
    );
}

export default Header;
```
Yukarıdaki kodu Header.jsx içerisine ekliyoruz.
```sh
import React from 'react';

const HomePage = () => {
    return (
        <div className="home-page">
            Home Page
        </div>
    );
}

export default HomePage;
```
Yukarıdaki kodu HomePage.jsx içerisine ekliyoruz.
```sh
import React from 'react';

const LazyPage = () => {
    return (
        <div className="lazy-page">
            Lazy Page
        </div>
    );
}

export default LazyPage;
```

Yukarıdaki kodu LazyPage.jsx içerisine ekliyoruz.

```sh
* {
    padding: 0;
    margin: 0;
}

.header {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f1f1f1;
    padding: 0 20px;
    box-sizing: border-box;
}
```
En son olarak yukarıdaki kodu app.css dosyasına eklıyoruz.

Sonunda basit bir örneği çıkarmış olduk. Artık 'yarn dev' diyerek projeyi başlatabilirsiniz.
 
### Production için optimizasyon
- js dosyaları için source-map'i devre dışı bırak
- css dosyalarını minimize et

```sh
yarn add mini-css-extract-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin -D
```

Webpack konfigürasyonlarını production ve development ortamları için bölelim. Proje dizinine build-utils isimli bir klasor olusturalım ve 'webpack.production.js', 'webpack.development.js' adlı 2 dosya olusturalım.

webpack.development.js içine alttaki kodu ekleyelim.
```sh
module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
});
```

webpack.production.js içine alttaki kodu ekleyelim.
```sh
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = () => ({
    devtool: "nosources-source-map",
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true 
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
});
```

Son olarak webpack.congif.js içeriğini alttaki ile değiştirelim.

```sh
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfiguration = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "production" }) => {
  return merge(
    {
      mode,
      entry: "./src/index.js",
      devServer: {
        hot: true,
        open: true,
        historyApiFallback: true,
      },
      output: {
        publicPath: "/",
        path: path.resolve(__dirname, "dist"),
        filename: "[hash].bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.jpe?g|png$/,
            exclude: /node_modules/,
            use: ["url-loader", "file-loader"],
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],
    },
    modeConfiguration(mode)
  );
};

```
