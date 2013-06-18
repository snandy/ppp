module.exports = function(grunt) {
	var gruntFile = grunt.file
	var concatObj = gruntFile.readJSON('concat.json'),
		uglifyObj = gruntFile.readJSON('uglify.json')
	
	var banner = function() {
		var date = new Date,
			h = date.getHours(),
			m = date.getMinutes(),
			s = date.getSeconds();

		h = h<10 ? '0'+h : h;
		m = m<10 ? '0'+m : m;
		s = s<10 ? '0'+s : s;
		var time = h + ':' + m + ':' + s;
		var str = '/*! <%= pkg.description %> <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> ' + time + ' */\n';
		return str
	}();
	
	uglifyObj.options = {
		banner: banner
	}
	
	// 配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			insertimg: {
				src: []
			}
		},
		concat: concatObj,
		uglify: uglifyObj

	});
	
	// 载入插件
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// 默认任务
	grunt.registerTask('default', ['concat', 'uglify']);

}; 