let {task,src,dest,watch,series,parallel} = require("gulp")
let load = require("gulp-load-plugins")()
let del = require("del")

// 删除dist目录
task('delDist',async ()=>{
    await del('./dist')
})

// 处理html
task('copyhtml',async ()=>{
    src('./*.html').pipe(dest('./dist')).pipe(load.connect.reload())
})

// 处理css
task('sass',async ()=>{
    src('./css/*.scss').pipe(load.sass().on('error',load.sass.logError)).pipe(dest('./dist/css')).pipe(load.connect.reload())
})

// 处理js
task('script',async ()=>{
    src('./js/*.js').pipe(dest('./dist/js')).pipe(load.connect.reload())
})

// 处理json
task('data',async ()=>{
    src('./data/*.json').pipe(dest('./dist/data')).pipe(load.connect.reload())
})

// 处理图片
task('image',async ()=>{
    src('./image/**/*.*').pipe(dest('./dist/image')).pipe(load.connect.reload())
})

// 启动一个服务
task('reload',async ()=>{
    load.connect.server({
        root : './dist',
        livereload : true,
        port : 8887
    })
})

task('watch',async ()=>{
    watch('./*.html',series('copyhtml'))
    watch('./css/*.scss',series('sass'))
    watch('./js/*.js',series('script'))
    watch('./data/*.json',series('data'))
    watch('./image/*.*',series('image'))
})

// 打包
task('dev',series('delDist','copyhtml','sass','script','data','image'))

// 启动一个项目
task('start',series('dev','reload','watch'))


