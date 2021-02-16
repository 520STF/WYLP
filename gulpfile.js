// /*
//     所需的插件
//     gulp-scss
//     gulp-minify-css
//     gulp-rename
// */ 
// let {task,src,dest,watch,series,parallel} = require("gulp")
// let load = require("gulp-load-plugins")()

// // 处理sass文件
// task('scss',async ()=>{
//     src("./css/index.scss")
//     .pipe(load.sass())
//     .pipe(dest('./dist/css'))
//     .pipe(load.minifyCss())
//     .pipe(load.rename('index.min.css'))
//     .pipe(dest('./dist/css'))
//     .pipe(load.connect.reload())
// })

// // 批量处理
// task('scssAll',async ()=>{
//     src('./css/*.scss')
//     .pipe(load.sass())
//     .pipe(dest('./dist/css'))
//     .pipe(load.connect.reload())
// })

// // 处理js
// task('scripts',async ()=>{
//     src('./js/*.js')
//     .pipe(dest('./dist/js'))
//     .pipe(load.connect.reload())
// })

// // 处理html
// task('copy-html',async ()=>{
//     src('./*.html')
//     .pipe(dest('./dist'))
//     .pipe(load.connect.reload())
// })

// // 处理数据
// task('data',async ()=>{
//     src('./data/*.json')
//     .pipe(dest('./dist/data'))
//     .pipe(load.connect.reload())
// })

// // 处理图片
// task('image',async ()=>{
//     src('./image/**/*')
//     .pipe(dest('./dist/image'))
//     .pipe(load.connect.reload())
// })

// // 一次性处理多个图片
// task('build',series('scss','scripts','copy-html','data','scssAll','image'),async ()=>{
//     console.log('项目建立成功');
// })

// // 建立监听
// task('watch',async ()=>{
//     watch('./css/index.scss',series('scss'))
//     watch('./css/*.scss',series('scssAll'))
//     watch('./js/*.js',series('scripts'))
//     watch('./*.html',series('copy-html'))
//     watch('./data/*.json',series('data'))
//     watch('./image/**/*',series('image'))
// })

// // 启动一个服务器
// task('server',async ()=>{
//     load.connect.server({
//         root :'./dist',
//         port : 8887,
//         livereload : true
//     })
// })

// // 启动一个默认的任务
// task('default',series('watch','server'))

let mode = process.argv[2]
switch(mode){
    case 'start':
        require('./gulpfile-dev')
        break;
    case 'build':
        require('./gulpfile-build')
        break;
}