
var gulp = require("gulp");
gulp.task("hi", function(){
    console.log("oi mundo")
});

var autoprefixer = require("gulp-autoprefixer");

gulp.task("prefix",function(){
    return gulp.src("css/*.css").pipe(autoprefixer()).pipe(gulp.dest("css/"));
})