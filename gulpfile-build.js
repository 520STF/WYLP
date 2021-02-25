// 加载gulp,并结构需要的方法
let {task,src,dest,watch,series,parallel} = require('gulp')
let load = require('gulp-load-plugins')()//自动加载其他gulp插件
let del = require('del')//删除文件

// 删除dist文件
task('delDist',async ()=>{
    await del('./dist')
})

// 处理scss
task('scss',async ()=>{
    src('./css/*.scss')
    .pipe(load.sass())
    .pipe(load.rev())
    .pipe(load.minifyCss())
    .pipe(dest('./dist/css'))
    .pipe(load.rev.manifest())
    .pipe(dest('./rev/css'))
})

// 处理js
task('script',async ()=>{
    src('./js/*.js')
    .pipe(dest('./dist/js'))
})

// 压缩图片
task('image', async ()=>{
    src('./image/**/*.*')
    .pipe(load.imageminChangba())
    .pipe(dest('./dist/image'))
})

// 处理json
task('data',async ()=>{
    src('./data/*.json').pipe(dest('./dist/data'))
})

// 处理html
task('html',async ()=>{
    await setTimeout(()=>{
        src(['./rev/**/*.json','./*.html'])
        .pipe(load.revCollector({replaceReved:true}))
        .pipe(load.minifyHtml())
        .pipe(dest('./dist'))
    },2000)
})

// 打包(生成环境)
task('build',series('delDist','scss','script','image','data','html'))

