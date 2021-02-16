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
    src('./script/*.js')
    .pipe(load.rev())
    .pipe(load.babel({
        presets : ['@babel/env']
    }))
    .pipe(load.uglify())
    .pipe(dest('./dist/js'))
    .pipe(load.rev.minifest())
    .pipe(dest('./rev/js'))
})

// 压缩图片
task('image', async ()=>{
    src('./image/*.*')
    .pipe(dest('./dist/image'))
})

// 处理html
task('html',async ()=>{
    setTimeout(()=>{
        src(['./rev/**/*.json','./views/*.html'])
        .pipe(load.revCollector({replaceReved:true}))
        .pipe(load.minifyHtml())
        .pipe(dest('./dist'))
    },2000)
})

// 打包(生成环境)
task('build',series('delDist','scss','script','image','html'))

