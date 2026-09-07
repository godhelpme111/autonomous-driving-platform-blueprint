(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  var baseText = { color: muted, fontSize: 12 };
  var baseAxis = { axisLine: { lineStyle: { color: rule } }, axisTick: { show: false }, axisLabel: baseText };

  function tip(extra) {
    return Object.assign({ trigger: 'axis', backgroundColor: bg2, borderColor: rule, borderWidth: 1,
      textStyle: { color: ink, fontSize: 12 }, appendToBody: true }, extra || {});
  }

  // --- Chart: 各子平台改造工作量分布（堆叠条形图） ---
  // 紫色 / 琥珀色与 HTML 中 .pill.new / .pill.some 的标签色保持一致
  var elWorkload = document.getElementById('chart-workload');
  if (elWorkload) {
    var chartWorkload = echarts.init(elWorkload, null, { renderer: 'svg' });
    var totals = [230, 445, 455, 285, 280, 405, 480, 260];
    chartWorkload.setOption({
      animation: false,
      tooltip: tip({ axisPointer: { type: 'shadow' } }),
      legend: { bottom: 0, textStyle: baseText, itemWidth: 14, itemHeight: 8 },
      grid: { left: 175, right: 60, top: 20, bottom: 56 },
      xAxis: Object.assign({ type: 'value', name: '人天', splitLine: { lineStyle: { color: rule } } }, baseAxis),
      yAxis: Object.assign({ type: 'category', inverse: true,
        data: ['统一访问门户 (230)', '车队管理平台 (445)', '监控调度平台 (455)', '运营管理平台 (285)', '数据服务平台 (280)', '远程驾驶平台 (405)', '共享中台能力层 (480)', 'AI / Agent 能力 (260)'] }, baseAxis),
      series: [
        { name: '新建', type: 'bar', stack: 'total', barWidth: 24, itemStyle: { color: '#7c3aed' },
          data: [160, 115, 280, 0, 280, 55, 480, 260] },
        { name: '改造升级', type: 'bar', stack: 'total', itemStyle: { color: accent },
          data: [40, 315, 150, 270, 0, 325, 0, 0] },
        { name: '跨平台对接', type: 'bar', stack: 'total', itemStyle: { color: '#b45309' },
          data: [30, 15, 25, 15, 0, 25, 0, 0],
          label: { show: true, position: 'right', color: ink, fontSize: 12, fontWeight: 600,
            formatter: function (p) { return totals[p.dataIndex]; } } }
      ]
    });
    window.addEventListener('resize', function () { chartWorkload.resize(); });
  }

  // --- Mermaid 初始化 ---
  if (window.mermaid) {
    mermaid.initialize({ startOnLoad: true, theme: 'neutral', securityLevel: 'loose' });
  }
})();
