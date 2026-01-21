import { useEffect, useRef } from 'react';
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';
import './Ribbons.css';

const Ribbons = ({
  colors = ['#FC8EAC', '#5227FF'],
  baseSpring = 0.03,
  baseFriction = 0.9,
  baseThickness = 30,
  offsetFactor = 0.05,
  pointCount = 50,
  speedMultiplier = 0.6,
  enableFade = true,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: window.devicePixelRatio || 2, alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    gl.canvas.style.position = 'fixed';
    gl.canvas.style.top = '0';
    gl.canvas.style.left = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.pointerEvents = 'none';
    gl.canvas.style.zIndex = 10;
    container.appendChild(gl.canvas);

    const scene = new Transform();
    const lines = [];

    // Simplified vertex shader for proper taper
    const vertex = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      uniform vec2 uResolution;
      uniform float uThickness;
      varying vec2 vUV;

      void main() {
        vUV = uv;

        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
        vec2 tangent = normalize(next.xy - prev.xy);
        vec2 normal = vec2(-tangent.y, tangent.x);
        float taper = 1.0 - uv.y; // taper at front
        normal *= uThickness * taper;
        vec2 pos = position.xy + normal * side;

        vec2 clip = pos / uResolution * 2.0 - 1.0;
        clip.y = -clip.y;
        gl_Position = vec4(clip, 0, 1);
      }
    `;

    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;

      void main() {
        float fade = 1.0;
        if(uEnableFade > 0.5) fade = 1.0 - vUV.y;
        gl_FragColor = vec4(uColor, uOpacity * fade);
      }
    `;

    const center = (colors.length - 1) / 2;
    colors.forEach((color, index) => {
      const spring = baseSpring + (Math.random() - 0.5) * 0.05;
      const friction = baseFriction + (Math.random() - 0.5) * 0.05;
      const thickness = baseThickness + (Math.random() - 0.5) * 5;

      const points = Array.from({ length: pointCount }, () => new Vec3());

      const line = {
        spring,
        friction,
        mouseVelocity: new Vec3(),
        mouseOffset: new Vec3((index - center) * offsetFactor * window.innerWidth, 0, 0),
        points,
        polyline: new Polyline(gl, {
          points,
          vertex,
          fragment,
          uniforms: {
            uColor: { value: new Color(color) },
            uThickness: { value: thickness },
            uOpacity: { value: 1.0 },
            uEnableFade: { value: enableFade ? 1.0 : 0.0 },
            uResolution: { value: [window.innerWidth, window.innerHeight] },
          },
        }),
      };

      line.polyline.mesh.setParent(scene);
      lines.push(line);
    });

    const mouse = new Vec3(window.innerWidth / 2, window.innerHeight / 2, 0);

    function updateMouse(e) {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      mouse.set(x, y, 0);
    }

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('touchstart', updateMouse);
    window.addEventListener('touchmove', updateMouse);

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      lines.forEach(line => {
        line.polyline.resize();
        line.polyline.mesh.program.uniforms.uResolution.value = [window.innerWidth, window.innerHeight];
      });
    }
    window.addEventListener('resize', resize);
    resize();

    let frameId;
    const tmp = new Vec3();

    function animate() {
      frameId = requestAnimationFrame(animate);

      lines.forEach(line => {
        tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
        line.mouseVelocity.add(tmp).multiply(line.friction);
        line.points[0].add(line.mouseVelocity);

        for (let i = 1; i < line.points.length; i++) {
          line.points[i].lerp(line.points[i - 1], speedMultiplier);
        }

        line.polyline.updateGeometry();
      });

      renderer.render({ scene });
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('touchstart', updateMouse);
      window.removeEventListener('touchmove', updateMouse);
      if (gl.canvas && gl.canvas.parentNode === container) container.removeChild(gl.canvas);
    };
  }, [
    colors,
    baseSpring,
    baseFriction,
    baseThickness,
    offsetFactor,
    pointCount,
    speedMultiplier,
    enableFade,
  ]);

  return <div ref={containerRef} className="ribbons-container" />;
};

export default Ribbons;
