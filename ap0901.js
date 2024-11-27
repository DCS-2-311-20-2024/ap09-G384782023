//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G38478-2023 平賀優維斗
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { GUI } from "ili-gui";

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const param = {
    axes: true, // 座標軸
  };

  // GUIコントローラの設定
  const gui = new GUI();
  gui.add(param, "axes").name("座標軸");

  // シーン作成
  const scene = new THREE.Scene();

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);

  //カード
  const cards = new THREE.Group();
  function makecards(){
    const h = 0.1;
    const d = 2;
    const w = 1;
    const gapX = 0.5;
    const gapZ = 0.3;

    //カードを並べる
    const card = new card(40);
    for(let i = 0;i<5;i++){
      for(let j=0;j<8;j++){
        card[i*8+j] = new THREE.Mesh(
          new THREE.BoxGeometry(w,h,d),
          new THREE.MeshLambertMaterial()
          
        );
        card.position.set(
          (w + gapX)*(j-8/2),
          0,
          -(d + gapZ) * i
        )
        cards.add(card);
      }
    }
    scene.add (cards);

  }
  makecards();








  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(1,2,3);
  camera.lookAt(0,0,0);

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, innerHeight);
  renderer.setClearColor(0x305070);
    document.getElementById("output").appendChild(renderer.domElement);

  // 描画処理

  // 描画関数
  function render() {
    // 座標軸の表示
    axes.visible = param.axes;
    // 描画
    renderer.render(scene, camera);
    // 次のフレームでの描画要請
    requestAnimationFrame(render);
  }

  // 描画開始
  render();
}

init();