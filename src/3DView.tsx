import * as BABYLON from 'babylonjs'
import { observer } from 'mobx-react'
import * as React from 'react'
import AppState from './AppState'

@observer
export default class View3D extends React.Component<{ appState: AppState }, {}> {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.FreeCamera;
  private _light: BABYLON.Light;

  componentDidMount() {
    this._canvas = this.refs.canvasRef as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
    this.create();
    //this._scene.render();
    this.doRender();
  }

  create() {
    this._scene = new BABYLON.Scene(this._engine);

    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this._scene);

    // target the camera to scene origin
    this._camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    this._camera.attachControl(this._canvas, false);

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);

    // create a built-in "sphere" shape; with 16 segments and diameter of 2
    let sphere = BABYLON.MeshBuilder.CreateSphere('sphere',
      { segments: 16, diameter: 2 }, this._scene);

    // move the sphere upward 1/2 of its height
    sphere.position.y = 1;

    // create a built-in "ground" shape
    let ground = BABYLON.MeshBuilder.CreateGround('ground',
      { width: 6, height: 6, subdivisions: 2 }, this._scene);

    let videoPlane = BABYLON.MeshBuilder.CreatePlane("videoPlane", { width: 8, height: 1 }, this._scene);

  }

  doRender() {
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });
  }

  render() {

    return <canvas ref='canvasRef' />
  }
}