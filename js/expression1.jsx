
verticalMultiplier=3;
horizontalMultiplier=5;
forwardSearch=width/horizontalMultiplier;
inOuts=[];
alexVertices=[];

// Add buffer coordinates so that the 0 mark is the centre of page
bufferCoordinates=[];
numberBufferCoordinates=(width/2)/horizontalMultiplier;
for(var i=0; i<numberBufferCoordinates; i++)
{
    bufferCoordinates[i]=[0,0];  
}
coordinates=bufferCoordinates.concat(coordinates);

timeo=Math.round(time*100);

if((timeo+forwardSearch)<coordinates.length)
{
	alexVertices = coordinates.slice(timeo, (timeo+forwardSearch)); 
}
else
{
	alexVertices=[0,0];
}

var xPosition=-width/2;

for(var i=0; i<alexVertices.length; i++)
{
    alexVertices[i]=[xPosition+(i*horizontalMultiplier),alexVertices[i][0]*verticalMultiplier];
	inOuts[i]=[0,0];
}  
closed = false;
createPath(alexVertices,inOuts,inOuts,closed);