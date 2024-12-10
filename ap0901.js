//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G38478-2023 平賀優維斗
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import {GLTFLoader} from "three/addons";
import {OrbitControls} from "three/addons";
import { GUI } from "ili-gui";

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const params = {
    fov: 60, // 視野角
    axes: true, // 座標軸
    cameraH: 20, // カメラの高さ
  };

  // ディスプレイ
const dpy = {
  W:6.2, // ディスプレイの幅
  H: 3.6, // ディスプレイの高さ
  D: 0.2, // ディスプレイの厚さ
  E: 0.1, // ディスプレイの縁
}
const std = {
  H: 2.0, // ディスプレイスタンドの高さ
  W: 1.5, // ディスプレイスタンドの幅
  D: 1.9, // ディスプレイスタンドの奥行
  T: 0.1, // ディスプレイスタンドの厚さ
}


  // GUIコントローラの設定
  const gui = new GUI();
  gui.add(params, "axes").name("座標軸");

  // シーン作成
  const scene = new THREE.Scene();

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, innerHeight);
  renderer.setClearColor(0x406080);
  document.getElementById("output").appendChild(renderer.domElement);

  
  
  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);

  //床
  
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshLambertMaterial({ color: 0xffffff }));
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  scene.add(plane);

// デスク

const seg = 12; // 円や円柱の分割数
const metalMaterial = new THREE.MeshPhongMaterial(
  {color: 0xffffff, shininess: 500, specular: 0x808080 });
const redMaterial = new THREE.MeshBasicMaterial({color: 0xc00000});
const legRad = 0.5; // 脚の円柱の半径
const taiyaRad = 0.4; // 脚の円柱の半径
const legLen = 7; // 脚の円柱の長さ
const legLen2 = 3; // 脚の円柱の長さ
const taiyaLen = 0.5; // 脚の円柱の長さ
const legSep = 1.2; // 脚の間隔

//　脚
const legGeometry
= new THREE.CylinderGeometry(legRad, legRad, legLen, seg, seg);
const legR = new THREE.Mesh(legGeometry, metalMaterial);
legR.position.set(10, legLen/2, -11);
scene.add(legR);
const legR2 = new THREE.Mesh(legGeometry, metalMaterial);
legR2.position.set(-3, legLen/2, -15);
scene.add(legR2);
const legL = new THREE.Mesh(legGeometry, metalMaterial);
legL.position.set(-3, legLen/2, -11);
scene.add(legL);
const legL2 = new THREE.Mesh(legGeometry, metalMaterial);
legL2.position.set(10, legLen/2, -15);
scene.add(legL2);
const legL3 = new THREE.Mesh(legGeometry, metalMaterial);
legL3.position.set(12, legLen/2, -15);
scene.add(legL3);
const legL4 = new THREE.Mesh(legGeometry, metalMaterial);
legL4.position.set(16, legLen/2, -15);
scene.add(legL4);
const legR3 = new THREE.Mesh(legGeometry, metalMaterial);
legR3.position.set(12, legLen/2, -1);
scene.add(legR3);
const legR4 = new THREE.Mesh(legGeometry, metalMaterial);
legR4.position.set(16, legLen/2, -1);
scene.add(legR4);

//　台

const deskW = 15;
const deskH = 0.2;
const deskD = 5;
const deskGeometry = new THREE.BoxGeometry(deskW,deskH,deskD);
const deskMaterial = new THREE.MeshLambertMaterial({color:0xc0c0c0});
const desk = new THREE.Mesh(deskGeometry,deskMaterial);
desk.position.set(4,7.1,-13);
scene.add(desk);
const desk2Geometry = new THREE.BoxGeometry(deskD,deskH,deskW);
const desk2Material = new THREE.MeshLambertMaterial({color:0xc0c0c0});
const desk2 = new THREE.Mesh(desk2Geometry,desk2Material);
desk2.position.set(4+deskW/2+deskD/2,7.1,-13+deskW/2-deskD/2);
scene.add(desk2);

//椅子
const chair = new THREE.Group();{
  const leg2Geometry
= new THREE.CylinderGeometry(legRad, legRad, legLen2, seg, seg);
  const chairleg= new THREE.Mesh(leg2Geometry, metalMaterial);
  chairleg.position.set(0, legLen2/2+1, 0);
  chair.add(chairleg);
  const chairleg2Geometry = new THREE.BoxGeometry(0.5,0.5,4);
  const chairleg2Material = new THREE.MeshLambertMaterial({color:0x000000});
  const chairleg2 = new THREE.Mesh(chairleg2Geometry,chairleg2Material);
  chairleg2.position.set(0,1,0);
  chairleg2.rotation.y = Math.PI/4;
  chair.add(chairleg2);
  const chairleg3 = new THREE.Mesh(chairleg2Geometry,chairleg2Material);
  chairleg3.position.set(0,1,0);
  chairleg3.rotation.y = Math.PI/-4;
  chair.add(chairleg3);
  const taiyaGeometry
= new THREE.CylinderGeometry(taiyaRad, taiyaRad, taiyaLen, seg, seg);
  const chairtaiya = new THREE.Mesh(taiyaGeometry, metalMaterial);
  chairtaiya.position.set(1, taiyaRad, 1);
  chairtaiya.rotation.x = Math.PI/2;
  chair.add(chairtaiya);
  const chairtaiya2 = new THREE.Mesh(taiyaGeometry, metalMaterial);
  chairtaiya2.position.set(-1, taiyaRad, 1);
  chairtaiya2.rotation.x = Math.PI/2;
  chair.add(chairtaiya2);
  const chairtaiya3 = new THREE.Mesh(taiyaGeometry, metalMaterial);
  chairtaiya3.position.set(1, taiyaRad, -1);
  chairtaiya3.rotation.x = Math.PI/2;
  chair.add(chairtaiya3);
  const chairtaiya4 = new THREE.Mesh(taiyaGeometry, metalMaterial);
  chairtaiya4.position.set(-1, taiyaRad, -1);
  chairtaiya4.rotation.x = Math.PI/2;
  chair.add(chairtaiya4);
  const chair1Geometry = new THREE.BoxGeometry(4,0.7,5);
  const chair1Material = new THREE.MeshLambertMaterial({color:0x000000})
  const chair1 = new THREE.Mesh(chair1Geometry,chair1Material);
  chair1.position.set(0,4,0);
  chair.add(chair1);
  const chair2Geometry = new THREE.BoxGeometry(4,5,0.7);
  const chair2Material = new THREE.MeshLambertMaterial({color:0x000000})
  const chair2 = new THREE.Mesh(chair2Geometry,chair2Material);
  chair2.position.set(0,6.5,2);
  chair.add(chair2);
  const chair3Geometry = new THREE.BoxGeometry(1,1,0.7);
  const chair3Material = new THREE.MeshLambertMaterial({color:0x000000})
  const chair3 = new THREE.Mesh(chair3Geometry,chair3Material);
  chair3.position.set(0,9.5,2);
  chair.add(chair3);
  const chair4Geometry = new THREE.BoxGeometry(3,1,0.7);
  const chair4Material = new THREE.MeshLambertMaterial({color:0x000000})
  const chair4 = new THREE.Mesh(chair4Geometry,chair4Material);
  chair4.position.set(0,10,2);
  chair.add(chair4);
  const chair5Geometry = new THREE.BoxGeometry(0.5,2,0.7);
  const chair5Material = new THREE.MeshLambertMaterial({color:0x000000})
  const chair5 = new THREE.Mesh(chair5Geometry,chair5Material);
  chair5.position.set(2,5,0);
  chair.add(chair5);
  const chair6Geometry = new THREE.BoxGeometry(0.5,2,0.7);
  const chair6Material = new THREE.MeshLambertMaterial({color:0x000000})
  const chair6 = new THREE.Mesh(chair6Geometry,chair6Material);
  chair6.position.set(-2,5,0);
  chair.add(chair6);
  const chair7Geometry = new THREE.BoxGeometry(0.7,0.3,3);
  const chair7Material = new THREE.MeshLambertMaterial({color:0x000000})
  const chair7 = new THREE.Mesh(chair7Geometry,chair7Material);
  chair7.position.set(2,6,0);
  chair.add(chair7);
  const chair8Geometry = new THREE.BoxGeometry(0.7,0.3,3);
  const chair8Material = new THREE.MeshLambertMaterial({color:0x000000})
  const chair8 = new THREE.Mesh(chair8Geometry,chair8Material);
  chair8.position.set(-2,6,0);
  chair.add(chair8);
}
chair.position.set(6,0,-7);
scene.add(chair);




const display = new THREE.Group();
{
  // 表示部
  const silverMaterial = new THREE.MeshPhongMaterial({color: "silver"});
  const blackMaterial = new THREE.MeshPhongMaterial({color:"black"});
  const face = new THREE.Mesh(
    new THREE.BoxGeometry(dpy.W, dpy.H, dpy.D),
    [silverMaterial,silverMaterial,silverMaterial,silverMaterial,blackMaterial,silverMaterial]
  );
  display.add(face);
  // スタンド台
  const standBase = new THREE.Mesh(
    new THREE.BoxGeometry(std.W,std.T,std.D),
    silverMaterial      
  )
  standBase.position.y = -(dpy.H/4+std.H);
  display.add(standBase);
    
  // スタンド脚
  const theta = Math.PI/8;
  const standBack = new THREE.Mesh(
    new THREE.BoxGeometry(
      std.W,
      std.H/Math.cos(theta),
      std.T),
      silverMaterial
    )
    standBack.rotation.x = theta ;
    standBack.position.set(
      0,
      -(dpy.H/4+std.H/2),
      -(std.H*Math.atan(theta))/2);

  display.add(standBack);

  // 影の設定
  display.children.forEach((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });
  display.position.set(7,10+std.T,-14.5);
}
scene.add(display);


//　キーボード
const bordGeometry = new THREE.BoxGeometry(5.5,0.3,2);
const bordMaterial = new THREE.MeshLambertMaterial({color:0x000});
const bord = new THREE.Mesh(bordGeometry,bordMaterial);
bord.position.set(6,7+0.15,-12.2);
scene.add(bord);

//　マウス
const nezumi = new THREE.Group();{
  const nezumiheadGeometry = new THREE.SphereGeometry(0.2, 24, 24, Math.PI / 2, Math.PI);
  const nezumiheadMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
  const nezumihead = new THREE.Mesh(nezumiheadGeometry,nezumiheadMaterial);
  nezumihead.position.set(0,0.15,0);
  nezumi.add(nezumihead);
  const nezumibodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.3,24,1,false,0,Math.PI);
  const nezumibodyMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
  const nezumibody = new THREE.Mesh(nezumibodyGeometry,nezumibodyMaterial);
  nezumi.add(nezumibody);
  const nezumitaleGeometry = new THREE.SphereGeometry(0.2, 24, 24, Math.PI / 2, Math.PI);
  const nezumitaleMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
  const nezumitale = new THREE.Mesh(nezumitaleGeometry,nezumitaleMaterial);
  nezumitale.position.set(0,-0.15,0);
  nezumi.add(nezumitale);
  const nezumikoroheadGeometry = new THREE.SphereGeometry(0.03, 24, 24, Math.PI / 2, Math.PI);
  const nezumikoroheadMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
  const nezumikorohead = new THREE.Mesh(nezumikoroheadGeometry,nezumikoroheadMaterial);
  nezumikorohead.position.set(0.2,-0.15+0.02,0);
  nezumi.add(nezumikorohead);
  const nezumikorobodyGeometry = new THREE.CylinderGeometry(0.03,0.03, 0.04,24,1,false,0,Math.PI);
  const nezumikorobodyMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
  const nezumikorobody = new THREE.Mesh(nezumikorobodyGeometry,nezumikorobodyMaterial);
  nezumikorobody.position.set(0.2,-0.15,0);
  nezumi.add(nezumikorobody);
  const nezumikorotaleGeometry = new THREE.SphereGeometry(0.03, 24, 24, Math.PI / 2, Math.PI);
  const nezumikorotaleMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
  const nezumikorotale = new THREE.Mesh(nezumikorotaleGeometry,nezumikorotaleMaterial);
  nezumikorotale.position.set(0.2,-0.15-0.02,0);
  nezumi.add(nezumikorotale);
}
nezumi.position.set(10,7+0.2,-12.5)
nezumi.rotation.x = Math.PI/2;
nezumi.rotation.y = Math.PI/2;

scene.add(nezumi);

//ベッド
const bed = new THREE.Group();{
  const beddaiGeometory = new THREE.BoxGeometry(10,1,20);
  const beddaiMaterial = new THREE.MeshLambertMaterial({color:0x800000});
  const beddai = new THREE.Mesh(beddaiGeometory,beddaiMaterial);
  beddai.position.set(0,3,0);
  bed.add(beddai);
  const bedmatGeometory = new THREE.BoxGeometry(9.9,2,19.8);
  const bedmatMaterial = new THREE.MeshLambertMaterial({color:0x000000});
  const bedmat = new THREE.Mesh(bedmatGeometory,bedmatMaterial);
  bedmat.position.set(0,4,0);
  bed.add(bedmat);
  const bedmakuraGeometory = new THREE.BoxGeometry(3,0.8,2);
  const bedmakuraMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
  const bedmakura = new THREE.Mesh(bedmakuraGeometory,bedmakuraMaterial);
  bedmakura.position.set(0,5.4,8.5);
  bed.add(bedmakura);
  const bedmoufuGeometory = new THREE.BoxGeometry(11.2,0.5,17.2);
  const bedmoufuMaterial = new THREE.MeshLambertMaterial({color:0xfffffff});
  const bedmoufu = new THREE.Mesh(bedmoufuGeometory,bedmoufuMaterial);
  bedmoufu.position.set(0,4.2,-2.2);
  bed.add(bedmoufu);
  const bedmoufu1Geometory = new THREE.BoxGeometry(11.2,1,1);
  const bedmoufu1Material = new THREE.MeshLambertMaterial({color:0xfffffff});
  const bedmoufu1 = new THREE.Mesh(bedmoufu1Geometory,bedmoufu1Material);
  bedmoufu1.position.set(0,4.7,5.9);
  bed.add(bedmoufu1);
  const bedmoufu2Geometory = new THREE.BoxGeometry(11,1,17);
  const bedmoufu2Material = new THREE.MeshLambertMaterial({color:0x000000});
  const bedmoufu2 = new THREE.Mesh(bedmoufu2Geometory,bedmoufu2Material);
  bedmoufu2.position.set(0,4.5,-2.2);
  bed.add(bedmoufu2);
  const bedlegGeometry
= new THREE.CylinderGeometry(legRad, legRad, 2.8, seg, seg);
const bedlegR = new THREE.Mesh(bedlegGeometry,beddaiMaterial);
bedlegR.position.set(4, 1.4, 9);
bed.add(bedlegR);

const bedlegR2 = new THREE.Mesh(bedlegGeometry,beddaiMaterial);
bedlegR2.position.set(4, 1.4, -9);
bed.add(bedlegR2);

const bedlegL = new THREE.Mesh(bedlegGeometry,beddaiMaterial);
bedlegL.position.set(-4, 1.4, 9);
bed.add(bedlegL);

const bedlegL2 = new THREE.Mesh(bedlegGeometry,beddaiMaterial);
bedlegL2.position.set(-4, 1.4, -9);
bed.add(bedlegL2);
  
}
bed.position.set(-12,0,9);
scene.add(bed);


  

  //光源の設定
  const spotLight = new THREE.SpotLight(0xffffff, 3000);
  spotLight.position.set(0,100,0);
  spotLight.castShadow = true;
  scene.add(spotLight);





  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    params.fov, window.innerWidth/window.innerHeight, 0.01, 100);
  camera.position.set(0,0,params.cameraH);
  camera.lookAt(0,0,0);

  

  
  // カメラコントロール
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDumping = true;
  

  
//背景
let renderTarget;
  function setBackground() {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "kabe.jpg",
      () => {
        renderTarget
         = new THREE.WebGLCubeRenderTarget(texture.image.height);
        renderTarget.fromEquirectangularTexture(renderer,texture);
        scene.background = renderTarget.texture;
        render();
      }
    )
  }
  setBackground();
  // 描画処理

  // 描画関数
  function render() {
    // カメラ制御
    orbitControls.update();
    // 座標軸の表示
    axes.visible = params.axes;
    // 描画
    renderer.render(scene, camera);
    
    // 次のフレームでの描画要請
    requestAnimationFrame(render);
  }
  

  // 描画開始
  render();
}

init();