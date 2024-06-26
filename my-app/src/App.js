import React, { useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const svgRef = useRef();
  const legendRef = useRef();
  const colorScale = useRef(d3.scaleOrdinal(d3.schemeCategory10));
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    d3.csv('https://raw.githubusercontent.com/brybrycha/dsc106_p3/main/p3/public/CSVs/dsc_course.csv').then(data => {
      console.log(data);
      setData(data);

      const allCourses = Array.from(new Set(data.map(d => d.name)));
      colorScale.current = d3.scaleOrdinal()
        .domain(allCourses)
        .range(d3.schemeCategory10);
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
      drawLegend();
    }
  }, [data, searchTerm]);

  const drawChart = () => {
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 100, right: 40, bottom: 40, left: 50 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add clipping
    svg.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    const maxWaitlisted = d3.max(data, d => parseFloat(d.waitlisted));


    const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S');
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => parseTime(d.time)))
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, maxWaitlisted])
      .range([height, 0]);

    const line = d3.line()
      .x(d => xScale(parseTime(d.time)))
      .y(d => yScale(parseFloat(d.waitlisted)));

    const groupedData = Array.from(d3.group(data, d => d.name), ([key, value]) => ({ key, value }));

    const lines = svg.append("g")
      .attr("clip-path", "url(#clip)");

    groupedData.forEach(d => {
      lines.append('path')
        .datum(d.value)
        .attr('fill', 'none')
        .attr('stroke', colorScale.current(d.key))
        .attr('stroke-width', 2)
        .attr('d', line)
        .attr('class', 'line')
        .transition()
        .duration(750);
    });

    svg.select('.y-axis').remove();
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on('zoom', zoomed);

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .call(zoom);

    function zoomed(event) {
      const { transform } = event;
      const newXScale = transform.rescaleX(xScale);
      const newYScale = transform.rescaleY(yScale);

      lines.selectAll('.line')
        .attr('d', d => line(d))
        .attr('transform', transform);

      svg.select('.x-axis').call(d3.axisBottom(newXScale));
      svg.select('.y-axis').call(d3.axisLeft(newYScale));
    }
  };

  const drawLegend = () => {
    const legend = d3.select(legendRef.current);

    const groupedData = Array.from(d3.group(data, d => d.name), ([key, value]) => ({ key, value }));

    const color = d3.scaleOrdinal()
      .domain(groupedData.map(d => d.key))
      .range(d3.schemeCategory10);

    const legendItems = legend.selectAll('.legend-item')
      .data(groupedData)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    legendItems.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', d => color(d.key));

    legendItems.append('text')
      .attr('x', 20)
      .attr('y', 10)
      .text(d => d.key)
      .style('font-size', '12px')
      .attr('alignment-baseline', 'middle');
  };

  return (
    <div className="App">
      <div className="search-container">
        <i className="search-icon">&#x1F50D;</i> {/* Unicode for a magnifying glass icon */}
        <input
          type="text"
          className="search-box"
          placeholder="Enter course name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <svg ref={svgRef}></svg>
      <svg ref={legendRef} className="legend"></svg>
    </div>
  );
}

export default App;
