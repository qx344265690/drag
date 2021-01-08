<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
import * as Three from "three";

export default {
  name: "ThreeTest",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
    };
  },
  methods: {
    init: function () {
      let container = document.getElementById('container');
      this.camera = new Three.PerspectiveCamera(70,container.clientWidth / container.clientHeight,0.01,10);
      this.camera.position.z = 1;

      this.scene = new Three.Scene();

      let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      let material = new Three.MeshNormalMaterial();

      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.renderer = new Three.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      // // 创建一个监听者
      // var listener = new Three.AudioListener();
      // // camera.add( listener );
      // // 创建一个非位置音频对象  用来控制播放
      // var audio = new Three.Audio(listener);
      // // 创建一个音频加载器对象
      // var audioLoader = new Three.AudioLoader();
      // // 加载音频文件，返回一个音频缓冲区对象作为回调函数参数
      // audioLoader.load('中国人.mp3', function(AudioBuffer) {
      //   // console.log(AudioBuffer)
      //   // 音频缓冲区对象关联到音频对象audio
      //   audio.setBuffer(AudioBuffer);
      //   audio.setLoop(true); //是否循环
      //   audio.setVolume(0.5); //音量
      //   // 播放缓冲区中的音频数据
      //   audio.play(); //play播放、stop停止、pause暂停
      // });
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.init();
    // this.animate();
  },
};
</script>
<style scoped>
#container {
  height: 100vh;
}
</style>
