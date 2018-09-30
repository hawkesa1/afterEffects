{
    #include "json2.js" // jshint ignore:line    
    #include "lyricRecorderLineStyle1.jsx" // jshint ignore:line    
     #include "lyricRecorderLineStyle2.jsx" // jshint ignore:line   
    #include "lyricRecorderLineStyleUtilities.jsx" // jshint ignore:line  
    
    app.beginUndoGroup("Create Music Video");
    var lyricRecorderAE={
     sampleFunction:function(){
      $.writeln("Sample Function");
      },
      readLyricDataFromFile:function(lyricsFile)
      {
            var scriptFile = File(lyricsFile);  
            scriptFile.open('r');  
            var content = scriptFile.read();  
            my_JSON_object =  JSON.parse(content);// now evaluate the string from the file
            scriptFile.close();
            return my_JSON_object;
      },
        createComposition:function(audioFile, lyricsFile)
        {
            var my_JSON_object=lyricRecorderAE.readLyricDataFromFile(lyricsFile);  
            var lines=my_JSON_object.lyricRecorderSynchronisedLyrics;
            $.writeln(lines);
            // Creating project
            var currentProject   = app.newProject();
            //Import the music file 
            var mp3Footage=currentProject.importFile(new ImportOptions(File(audioFile)));
            
          

            // Creating comp
            //var compSettings     = cs = [1920, 1080, 1, mp3Footage.duration, 60];
            var compSettings     = cs = [1920, 1080, 1, 15, 30];
            var compName  = "MusicVideo"
            var currentComp      = currentProject.items.addComp(compName, cs[0], cs[1], cs[2], cs[3], cs[4]); 
          
            
            currentComp.openInViewer();
            //Add the music file to the composition
            currentComp.layers.add(mp3Footage);  
            var camera =   currentComp.layers.addCamera("alexCamera1",[currentComp.width/2,currentComp.height/2]);
            var light = currentComp.layers.addLight("alexLight1",[currentComp.width/2,currentComp.height/2]);
            
            light.castsShadows.setValue(1);

            //Add a background
            var backgroundLayer  = currentComp.layers.addSolid([0,0,0], "Background", cs[0]*5, cs[1]*5, cs[2]); 
            backgroundLayer.threeDLayer=true;
            lyricRecorderAE.handleLines(lines, currentComp,camera, light);
         
            
              app.executeCommand(app.findMenuCommandId("Convert Audio to Keyframes"));
         },   
        handleLines:function(lines, currentComp, camera, light)
        {
            // for(var i=0; i<lines.length; i++)
             for(var i=0; i<2; i++)
            {
                var line;
                line=lines[i];
               
                lyricRecorderLineStyle2 .drawLine(currentComp, line, camera, light);
                
            }            
         }
     }
 
    lyricRecorderAE.createComposition("H:\\Development\\afterEffects\\LyricRecorder\\audio\\audio.mp3", "H:\\Development\\afterEffects\\LyricRecorder\\lyricData\\LyricRecorder.js");
    app.endUndoGroup();
  }
