var chartDom1 = document.getElementById('curve');
var myChart1 = echarts.init(chartDom1);
myChart1.setOption({
	title: {
		text: '曲线图数据展示',
		x: 'center',
		y: 'top',
		textAlign: 'center',
		textStyle: {
			width: 137,
			height: 20,
			fontSize: 20,
			lineHeight: 24,
		}
	},
	tooltip: {},
	xAxis: {
		data: []
	},
	yAxis: {},
	series: [{
		symbol:'none',
		data: [],
		type: 'line',
		smooth: true,
		areaStyle: {}
	}]

});

var chartDom2 = document.getElementById('pie');
var myChart2 = echarts.init(chartDom2);
myChart2.setOption({
	title: {
		text: '饼状图数据展示',
		x: 'center',
		y: 'top',
		textAlign: 'center',
		textStyle: {
			width: 137,
			height: 20,
			fontSize: 20,
			lineHeight: 24,
		}
	},
	tooltip: {
		trigger: 'item'
	},
	series: [{
		data: [],
		type: 'pie'
	}]
});

var chartDom3 = document.getElementById('columnar');
var myChart3 = echarts.init(chartDom3);
myChart3.setOption({
	title: {
		text: '柱状图数据展示',
		x: 'center',
		y: 'top',
		textAlign: 'center',
		textStyle: {
			width: 137,
			height: 20,
			fontSize: 20,
			lineHeight: 24,
		}
	},
	xAxis: {
		data: []
	},
	yAxis: {},
	series: [{
		data: [],
		type: 'bar'
	}]
});

function showCurve() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://edu.telking.com/api?type=month");
	console.log(xhr);
	xhr.send();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			var data = JSON.parse(xhr.responseText).data;
			myChart1.setOption({
				xAxis: {
					data: data.xAxis
				},
				series: [{
					data: data.series
				}]
			});
		}
	}
}

function showPie() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "https://edu.telking.com/api?type=week");
	console.log(xhr);
	xhr.send();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			var data = JSON.parse(xhr.responseText).data;
			var getData = [];
			console.log(data.xAxis.length);
			for(var i = 0; i < data.xAxis.length; i++) {
				var obj = new Object();
				obj.name = data.xAxis[i];
				obj.value = data.series[i];
				getData[i] = obj;
			}
			myChart2.setOption({
				series: [{
					data: getData
				}]
			});
			myChart3.setOption({
				xAxis: {
					data: data.xAxis
				},
				series: [{
					data: data.series
				}]
			});
		}
	}
}

window.onload = function() {
	showCurve();
	showPie();
}