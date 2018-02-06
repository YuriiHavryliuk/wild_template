var gulp       	 = require('gulp'),
	sass         = require('gulp-sass'), 
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),  
	cssnano      = require('gulp-cssnano'), 
	rename       = require('gulp-rename'), 
	del          = require('del'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	nunjucks 	 = require('gulp-nunjucks')
	iconfont     = require('gulp-iconfont'),
	iconfontCss  = require('gulp-iconfont-css'),
	fontName = 'wild-icons';

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('src/sass/**/*.scss') // Берем источник
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредст
		.pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('src/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('nunjucks', function () {
	return gulp.src('src/template/index.html')
		.pipe(nunjucks.compile())
		.pipe(gulp.dest('src'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('iconfont', function(){
	gulp.src(['src/icon/*.svg'])
		.pipe(iconfontCss({
			fontName: fontName,
			path: 'src/sass/templates/_icons.scss',
			targetPath: '../sass/_icons.scss',
			fontPath: '../font/'
		}))
		.pipe(iconfont({
			fontName: fontName,
			normalize: true,
			fontHeight: 1001
		}))
		.pipe(gulp.dest('src/font/')
	);
});


gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - asrc
		},
		notify: false // Отключаем уведомления
	});
});


gulp.task('css-main', ['sass'], function() {
	return gulp.src('src/css/main.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('src/css')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync','nunjucks', 'sass'], function() {
	gulp.watch('src/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('src/template/**/*.html', ['nunjucks', browserSync.reload]);
	gulp.watch('src/script/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
	gulp.watch('src/css/**/*.css', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('docs'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('src/img/**/*') // Берем все изображения из app

		.pipe(gulp.dest('docs/img')); // Выгружаем на продакшен
});


gulp.task('build', ['clean', 'img', 'sass', 'nunjucks'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'src/css/main.min.css'])
	.pipe(gulp.dest('docs/css'))

	var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('docs/fonts'))

	var buildJs = gulp.src('src/script/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('docs/script'))

	var buildHtml = gulp.src('docs/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('docs'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);