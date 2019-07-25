
forwardSearch=500;
inOuts=[];
alexVertices=[];

timeo=Math.round(time*10);

if((timeo+forwardSearch)<coordinates.length)
{
	alexVertices = coordinates.slice(timeo, (timeo+forwardSearch)); 
}
else
{
	alexVertices=[0,0];
}

for(var i=0; i<alexVertices.length; i++)
{
    alexVertices[i]=[i,alexVertices[i][0]];
	inOuts[i]=[0,0];
}  
closed = false;
createPath(alexVertices,inOuts,inOuts,closed);