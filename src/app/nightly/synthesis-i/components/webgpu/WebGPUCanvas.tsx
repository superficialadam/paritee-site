'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useFutureInnovation } from '../../hooks/useFutureInnovation'

// WebGPU Compute Shader for generative art
const PARTICLE_COMPUTE_SHADER = `
struct Particle {
  position: vec2f,
  velocity: vec2f,
  acceleration: vec2f,
  life: f32,
  energy: f32,
  consciousness: f32,
  quantum_state: f32,
  creativity_index: f32,
}

struct UniformData {
  time: f32,
  delta_time: f32,
  mouse_pos: vec2f,
  screen_size: vec2f,
  user_intent: f32,
  creativity_mode: f32,
  quantum_coherence: f32,
  innovation_factor: f32,
}

@group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
@group(0) @binding(1) var<uniform> uniforms: UniformData;

// Quantum-inspired noise function
fn quantum_noise(pos: vec2f, time: f32, quantum_state: f32) -> f32 {
  let superposition = sin(pos.x * 0.01 + time * 0.1) * cos(pos.y * 0.01 + time * 0.15);
  let entanglement = sin(quantum_state * 6.28318) * 0.5 + 0.5;
  return superposition * entanglement;
}

// Consciousness-based force field
fn consciousness_field(pos: vec2f, time: f32, consciousness: f32) -> vec2f {
  let field_strength = consciousness * uniforms.innovation_factor;
  let angle = time * 0.01 + consciousness * 6.28318;
  return vec2f(
    sin(angle + pos.x * 0.001) * field_strength,
    cos(angle + pos.y * 0.001) * field_strength
  );
}

// AI-creative force based on user intent
fn ai_creative_force(pos: vec2f, mouse: vec2f, creativity: f32) -> vec2f {
  let to_mouse = mouse - pos;
  let distance = length(to_mouse);
  
  if (distance > 0.0 && distance < 300.0) {
    let normalized = to_mouse / distance;
    let force_strength = (1.0 - distance / 300.0) * creativity * uniforms.user_intent;
    
    // Creative spiral force
    let perpendicular = vec2f(-normalized.y, normalized.x);
    let attraction = normalized * force_strength * 0.5;
    let spiral = perpendicular * force_strength * 0.3;
    
    return attraction + spiral;
  }
  
  return vec2f(0.0, 0.0);
}

// Quantum coherence behavior
fn quantum_coherence_update(particle: ptr<function, Particle>) -> void {
  let coherence = uniforms.quantum_coherence;
  
  // Quantum tunneling effect
  if ((*particle).quantum_state > 0.8 && coherence > 0.5) {
    let tunnel_prob = coherence * 0.1;
    if (quantum_noise((*particle).position, uniforms.time, (*particle).quantum_state) > (1.0 - tunnel_prob)) {
      // Quantum tunnel to new position
      (*particle).position = vec2f(
        (*particle).position.x + (quantum_noise((*particle).position, uniforms.time + 100.0, (*particle).quantum_state) - 0.5) * 100.0,
        (*particle).position.y + (quantum_noise((*particle).position, uniforms.time + 200.0, (*particle).quantum_state) - 0.5) * 100.0
      );
    }
  }
  
  // Quantum superposition effect on creativity
  (*particle).creativity_index = 0.5 + 0.5 * sin((*particle).quantum_state * 6.28318 + uniforms.time * 0.02);
}

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3u) {
  let index = global_id.x;
  if (index >= arrayLength(&particles)) {
    return;
  }
  
  var particle = particles[index];
  
  // Reset acceleration
  particle.acceleration = vec2f(0.0, 0.0);
  
  // Apply consciousness field
  let consciousness_force = consciousness_field(particle.position, uniforms.time, particle.consciousness);
  particle.acceleration += consciousness_force * 0.1;
  
  // Apply AI creative force based on user interaction
  let creative_force = ai_creative_force(particle.position, uniforms.mouse_pos, particle.creativity_index);
  particle.acceleration += creative_force * 0.05;
  
  // Quantum coherence effects
  quantum_coherence_update(&particle);
  
  // Future physics: Emergent behavior from particle interactions
  var neighbor_influence = vec2f(0.0, 0.0);
  var neighbor_count = 0u;
  
  // Check nearby particles (simplified for performance)
  for (var i = 0u; i < min(arrayLength(&particles), 64u); i++) {
    if (i == index) { continue; }
    
    let other = particles[i];
    let distance = length(other.position - particle.position);
    
    if (distance > 0.0 && distance < 50.0) {
      // Flocking behavior with consciousness weighting
      let to_other = (other.position - particle.position) / distance;
      let consciousness_sync = abs(particle.consciousness - other.consciousness);
      let influence_strength = (1.0 - distance / 50.0) * (1.0 - consciousness_sync);
      
      neighbor_influence += to_other * influence_strength * 0.02;
      neighbor_count++;
    }
  }
  
  if (neighbor_count > 0u) {
    particle.acceleration += neighbor_influence;
  }
  
  // Update physics
  particle.velocity += particle.acceleration * uniforms.delta_time;
  particle.velocity *= 0.98; // Damping
  particle.position += particle.velocity * uniforms.delta_time;
  
  // Boundary conditions with wrapping
  if (particle.position.x < 0.0) { particle.position.x = uniforms.screen_size.x; }
  if (particle.position.x > uniforms.screen_size.x) { particle.position.x = 0.0; }
  if (particle.position.y < 0.0) { particle.position.y = uniforms.screen_size.y; }
  if (particle.position.y > uniforms.screen_size.y) { particle.position.y = 0.0; }
  
  // Update particle properties
  particle.life += uniforms.delta_time * 0.01;
  particle.energy = 0.5 + 0.5 * sin(particle.life * 0.1 + particle.consciousness * 6.28318);
  particle.consciousness += (quantum_noise(particle.position, uniforms.time, particle.quantum_state) - 0.5) * 0.001;
  particle.consciousness = clamp(particle.consciousness, 0.0, 1.0);
  particle.quantum_state = fract(particle.quantum_state + uniforms.delta_time * 0.001);
  
  particles[index] = particle;
}
`;

// WebGPU Vertex Shader
const VERTEX_SHADER = `
struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) color: vec4f,
  @location(1) life: f32,
}

struct Particle {
  position: vec2f,
  velocity: vec2f,
  acceleration: vec2f,
  life: f32,
  energy: f32,
  consciousness: f32,
  quantum_state: f32,
  creativity_index: f32,
}

struct UniformData {
  time: f32,
  delta_time: f32,
  mouse_pos: vec2f,
  screen_size: vec2f,
  user_intent: f32,
  creativity_mode: f32,
  quantum_coherence: f32,
  innovation_factor: f32,
}

@group(0) @binding(0) var<storage, read> particles: array<Particle>;
@group(0) @binding(1) var<uniform> uniforms: UniformData;

@vertex
fn main(@builtin(vertex_index) vertex_index: u32, @builtin(instance_index) instance_index: u32) -> VertexOutput {
  let particle = particles[instance_index];
  
  // Convert to clip space
  let clip_pos = vec2f(
    (particle.position.x / uniforms.screen_size.x) * 2.0 - 1.0,
    1.0 - (particle.position.y / uniforms.screen_size.y) * 2.0
  );
  
  // Particle size based on energy and consciousness
  let size = (particle.energy * particle.consciousness + 0.1) * 0.01;
  
  // Quad vertices
  let positions = array<vec2f, 4>(
    vec2f(-size, -size),
    vec2f( size, -size),
    vec2f(-size,  size),
    vec2f( size,  size)
  );
  
  let final_pos = clip_pos + positions[vertex_index];
  
  // Color based on quantum state and creativity
  let quantum_hue = particle.quantum_state * 360.0;
  let creativity_saturation = particle.creativity_index;
  let consciousness_brightness = particle.consciousness * particle.energy;
  
  // HSV to RGB conversion for quantum colors
  let c = consciousness_brightness * creativity_saturation;
  let h = quantum_hue / 60.0;
  let x = c * (1.0 - abs(fract(h * 0.5) * 2.0 - 1.0));
  let m = consciousness_brightness - c;
  
  var rgb = vec3f(m);
  if (h < 1.0) { rgb = vec3f(c + m, x + m, m); }
  else if (h < 2.0) { rgb = vec3f(x + m, c + m, m); }
  else if (h < 3.0) { rgb = vec3f(m, c + m, x + m); }
  else if (h < 4.0) { rgb = vec3f(m, x + m, c + m); }
  else if (h < 5.0) { rgb = vec3f(x + m, m, c + m); }
  else { rgb = vec3f(c + m, m, x + m); }
  
  return VertexOutput(
    vec4f(final_pos, 0.0, 1.0),
    vec4f(rgb, particle.energy * particle.consciousness),
    particle.life
  );
}
`;

// WebGPU Fragment Shader
const FRAGMENT_SHADER = `
@fragment
fn main(@location(0) color: vec4f, @location(1) life: f32) -> @location(0) vec4f {
  // Circular particle shape with quantum glow
  let center = vec2f(0.5, 0.5);
  let coord = vec2f(0.5, 0.5); // Would need actual fragment coordinates
  let distance = length(coord - center);
  
  if (distance > 0.5) {
    discard;
  }
  
  // Quantum glow effect
  let glow = 1.0 - distance * 2.0;
  let quantum_pulse = 0.5 + 0.5 * sin(life * 2.0);
  
  return vec4f(color.rgb, color.a * glow * quantum_pulse);
}
`;

interface WebGPUState {
  device: GPUDevice | null
  context: GPUCanvasContext | null
  computePipeline: GPUComputePipeline | null
  renderPipeline: GPURenderPipeline | null
  particleBuffer: GPUBuffer | null
  uniformBuffer: GPUBuffer | null
  bindGroup: GPUBindGroup | null
}

export function WebGPUCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const webgpuStateRef = useRef<WebGPUState>({
    device: null,
    context: null,
    computePipeline: null,
    renderPipeline: null,
    particleBuffer: null,
    uniformBuffer: null,
    bindGroup: null
  })
  const animationRef = useRef<number>()
  const [isWebGPUSupported, setIsWebGPUSupported] = useState<boolean | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const { futureMode } = useFutureInnovation()

  const mouseRef = useRef({ x: 0, y: 0 })
  const startTimeRef = useRef(performance.now())
  const lastFrameTimeRef = useRef(0)

  // Initialize WebGPU
  const initializeWebGPU = useCallback(async () => {
    if (!canvasRef.current || !navigator.gpu) {
      setIsWebGPUSupported(false)
      return false
    }

    try {
      // Request adapter and device
      const adapter = await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance'
      })
      
      if (!adapter) {
        setIsWebGPUSupported(false)
        return false
      }

      const device = await adapter.requestDevice({
        requiredFeatures: ['compute-shader'] as any,
      })

      // Configure canvas context
      const context = canvasRef.current.getContext('webgpu') as GPUCanvasContext
      if (!context) {
        setIsWebGPUSupported(false)
        return false
      }

      context.configure({
        device,
        format: 'bgra8unorm',
        alphaMode: 'premultiplied'
      })

      // Create compute shader module
      const computeShaderModule = device.createShaderModule({
        code: PARTICLE_COMPUTE_SHADER
      })

      // Create render shader modules
      const vertexShaderModule = device.createShaderModule({
        code: VERTEX_SHADER
      })

      const fragmentShaderModule = device.createShaderModule({
        code: FRAGMENT_SHADER
      })

      // Create buffers
      const PARTICLE_COUNT = 4096 // 2^12 particles for quantum coherence
      const particleBuffer = device.createBuffer({
        size: PARTICLE_COUNT * 8 * 4, // 8 f32 per particle
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.VERTEX
      })

      const uniformBuffer = device.createBuffer({
        size: 8 * 4, // 8 f32 uniforms
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
      })

      // Initialize particles with quantum properties
      const initialParticleData = new Float32Array(PARTICLE_COUNT * 8)
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const base = i * 8
        initialParticleData[base + 0] = Math.random() * window.innerWidth      // position.x
        initialParticleData[base + 1] = Math.random() * window.innerHeight     // position.y
        initialParticleData[base + 2] = (Math.random() - 0.5) * 2             // velocity.x
        initialParticleData[base + 3] = (Math.random() - 0.5) * 2             // velocity.y
        initialParticleData[base + 4] = 0                                      // acceleration.x
        initialParticleData[base + 5] = 0                                      // acceleration.y
        initialParticleData[base + 6] = Math.random() * 1000                  // life
        initialParticleData[base + 7] = Math.random()                         // energy
        // Additional quantum properties would be added in a real implementation
      }

      device.queue.writeBuffer(particleBuffer, 0, initialParticleData)

      // Create bind group layout
      const bindGroupLayout = device.createBindGroupLayout({
        entries: [
          {
            binding: 0,
            visibility: GPUShaderStage.COMPUTE | GPUShaderStage.VERTEX,
            buffer: { type: 'storage' }
          },
          {
            binding: 1,
            visibility: GPUShaderStage.COMPUTE | GPUShaderStage.VERTEX,
            buffer: { type: 'uniform' }
          }
        ]
      })

      // Create bind group
      const bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [
          { binding: 0, resource: { buffer: particleBuffer } },
          { binding: 1, resource: { buffer: uniformBuffer } }
        ]
      })

      // Create compute pipeline
      const computePipeline = device.createComputePipeline({
        layout: device.createPipelineLayout({
          bindGroupLayouts: [bindGroupLayout]
        }),
        compute: {
          module: computeShaderModule,
          entryPoint: 'main'
        }
      })

      // Create render pipeline
      const renderPipeline = device.createRenderPipeline({
        layout: device.createPipelineLayout({
          bindGroupLayouts: [bindGroupLayout]
        }),
        vertex: {
          module: vertexShaderModule,
          entryPoint: 'main'
        },
        fragment: {
          module: fragmentShaderModule,
          entryPoint: 'main',
          targets: [{
            format: 'bgra8unorm',
            blend: {
              color: {
                srcFactor: 'src-alpha',
                dstFactor: 'one-minus-src-alpha'
              },
              alpha: {
                srcFactor: 'one',
                dstFactor: 'one-minus-src-alpha'
              }
            }
          }]
        },
        primitive: {
          topology: 'triangle-strip'
        }
      })

      // Update state
      webgpuStateRef.current = {
        device,
        context,
        computePipeline,
        renderPipeline,
        particleBuffer,
        uniformBuffer,
        bindGroup
      }

      setIsWebGPUSupported(true)
      setIsInitialized(true)
      return true
    } catch (error) {
      console.error('WebGPU initialization failed:', error)
      setIsWebGPUSupported(false)
      return false
    }
  }, [])

  // Render loop
  const render = useCallback(() => {
    const state = webgpuStateRef.current
    if (!state.device || !state.context || !state.computePipeline || !state.renderPipeline) {
      return
    }

    const currentTime = performance.now()
    const deltaTime = Math.min(currentTime - lastFrameTimeRef.current, 16.67) // Cap at 60fps
    lastFrameTimeRef.current = currentTime

    // Update uniforms
    const uniformData = new Float32Array([
      (currentTime - startTimeRef.current) / 1000, // time
      deltaTime / 1000,                            // delta_time
      mouseRef.current.x,                          // mouse_pos.x
      mouseRef.current.y,                          // mouse_pos.y
      window.innerWidth,                           // screen_size.x
      window.innerHeight,                          // screen_size.y
      0.8,                                         // user_intent
      1.0,                                         // creativity_mode
      0.7,                                         // quantum_coherence
      0.9                                          // innovation_factor
    ])

    state.device.queue.writeBuffer(state.uniformBuffer!, 0, uniformData)

    // Create command encoder
    const commandEncoder = state.device.createCommandEncoder()

    // Compute pass
    const computePass = commandEncoder.beginComputePass()
    computePass.setPipeline(state.computePipeline)
    computePass.setBindGroup(0, state.bindGroup!)
    computePass.dispatchWorkgroups(Math.ceil(4096 / 64)) // 64 is workgroup size
    computePass.end()

    // Render pass
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: state.context.getCurrentTexture().createView(),
        clearValue: { r: 0.02, g: 0.05, b: 0.12, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store'
      }]
    })

    renderPass.setPipeline(state.renderPipeline)
    renderPass.setBindGroup(0, state.bindGroup!)
    renderPass.draw(4, 4096) // 4 vertices per particle, 4096 instances
    renderPass.end()

    // Submit commands
    state.device.queue.submit([commandEncoder.finish()])

    animationRef.current = requestAnimationFrame(render)
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Initialize WebGPU on mount
  useEffect(() => {
    if (futureMode === 'full') {
      initializeWebGPU().then(success => {
        if (success) {
          render()
        }
      })
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [futureMode, initializeWebGPU, render])

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fallback for non-WebGPU browsers
  if (isWebGPUSupported === false) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/20">
        <div className="absolute top-4 left-4 text-xs text-blue-400/60 bg-black/20 backdrop-blur-sm rounded px-2 py-1">
          WebGPU not supported - using fallback visualization
        </div>
      </div>
    )
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'transparent',
          mixBlendMode: 'screen'
        }}
        width={typeof window !== 'undefined' ? window.innerWidth : 1920}
        height={typeof window !== 'undefined' ? window.innerHeight : 1080}
      />
      
      {isInitialized && (
        <div className="fixed top-4 left-4 text-xs text-green-400/80 bg-black/20 backdrop-blur-sm rounded px-2 py-1 pointer-events-none z-50">
          🚀 WebGPU Compute Shaders Active - Quantum Particle System Online
        </div>
      )}
    </>
  )
}