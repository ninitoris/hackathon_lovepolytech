import { Extension } from 'ng2-adsk-forge-viewer';

//const Autodesk = globalThis.Autodesk;
const THREE = globalThis.THREE;

export class MyExtension extends Extension {
  // Extension must have a name
  public static extensionName: string = 'MyExtension';

  // Toolbar test
  private subToolbar: Autodesk.Viewing.UI.ToolBar;
  private onToolbarCreatedBinded: any;

  private viewerFrame: Autodesk.Viewing.GuiViewer3D;



  public activate() {
    return true;
  }

  public deactivate() {
    return true;
  }
 
  public load() {
    // Called when Forge Viewer loads your extension
    console.log('MyExtension loaded!');
    
    if (Autodesk){
      this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, (e) => {
        if (e.dbIdArray.length) {
          const dbId = e.dbIdArray[0];
          this.viewer.setThemingColor(dbId, new THREE.Vector4(0, 1, 1,1));
        }
      });
    }else(
      console.log('AUTODESK IS NOT DEFINED')
    )

    // Initialise a toolbar
    if (this.viewer.toolbar) {
      // Toolbar is already available, create the UI
      this.createUI();
    } else {
      // Toolbar hasn't been created yet, wait until we get notification of its creation
      this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
      this.viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    }
    


    // Must return true or extension will fail to load
    return true;
  }
 
  public unload() {
    if (this.subToolbar) {
      this.viewer.toolbar.removeControl(this.subToolbar);
      
    }

    // Called when Forge Viewer unloads your extension
    console.log('MyExtension unloaded.');
    // Must return true or extension will fail to unload
    return true;
  }

  public onToolbarCreated() {
    this.viewer.removeEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
    const toolbarControls = [];
    for (let i = 0; i < this.viewer.toolbar.getNumberOfControls(); i++) {
      toolbarControls.push(this.viewer.toolbar.getControlId(i));
    }
    //toolbarControls.forEach(control => this.viewer.toolbar.removeControl(control));
    toolbarControls.forEach(control => console.log(control));
    
  }

  private createUI() {
    // Button 1
    const button1 = new Autodesk.Viewing.UI.Button('my-view-front-button');
    button1.onClick = e => this.setViewCube('front');
    button1.addClass('my-view-front-button');
    button1.setToolTip('View front');

    // Button 2
    const button2 = new Autodesk.Viewing.UI.Button('my-view-back-button');
    button2.onClick = e => this.setViewCube('back');
    button2.addClass('my-view-back-button');
    button2.setToolTip('View Back');

    // SubToolbar
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-view-toolbar');
    this.subToolbar.addControl(button1);
    this.subToolbar.addControl(button2);

    this.viewer.toolbar.addControl(this.subToolbar);
  }

  private setViewCube(orientation: 'front'|'back') {
    const ext = (this.viewer.getExtension('Autodesk.ViewCubeUi') as any);
    ext.setViewCube(orientation);
  }
}