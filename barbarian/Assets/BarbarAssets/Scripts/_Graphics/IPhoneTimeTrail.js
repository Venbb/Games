#pragma strict

class Point
{
   var timeCreated = 0.00;
   var position : Vector3;
   var lineBreak = false;
}

class PointArray
{
  private var arr : Point[];
  private var head : int = 0;
  private var tail : int = -1;
  private var nextFreePos : int = 0;
  private var size : int = 0;
  private var i : int = 0;
  
  function PointArray(s : int) {
    arr = new Point[s];
    for (i=0; i < s; ++i) {
      arr[i] = new Point();
    }
  }
  
  function Reset() {
    head = 0;
    tail = -1;
    nextFreePos = 0;
    size = 0;
  } 
    
    function Add(pos : Vector3) {
        if (IsFull()) {
            var new_arr : Point[] = new Point[arr.length * 2];
            for (i=0; i < arr.length; ++i) {
                new_arr[i] = arr[i];
            }
            for (i=arr.length; i < new_arr.length; ++i) {
                new_arr[i] = new Point();
            }
            nextFreePos = arr.length;
            arr = new_arr;
        }
        
        arr[nextFreePos].timeCreated = Time.time;
        arr[nextFreePos].position = pos;
        arr[nextFreePos].lineBreak = false;
        tail = nextFreePos;
        nextFreePos = (nextFreePos + 1) % arr.length;
        ++size;
    }
    
    function Length() {
        return size;
    }
    
    function IsEmpty() {
      return size == 0;
    }
    
    function NotEmpty() {
        return size != 0;
    }
    
    function IsFull() {
        return size == (arr.length-1);
    }
    
    // Use positive relInx to start counting from the head of the circular array
    // Use negative relInx to start counter from the tail of the circular array
    // (The relative index must always be in the range 0..size-1)
    function At(relInx : int) {
        return arr[RelativeToAbsoluteIndex(relInx)];
    }
    
    function RelativeToAbsoluteIndex(relInx : int) {
        if (relInx >= 0) {
            return (head + relInx) % arr.length;
        } else {
            return tail + relInx + 1;
        }
    }
    
    function RemoveDeadPoints(lifeTime: float) {
        if (IsEmpty()) return;
        
        // Skip over dead points to find the new head
        for (i = 0; i < size; ++i) {
            var age : float = (Time.time - At(i).timeCreated) * 1.0;
            if (age <= lifeTime) {
                head = RelativeToAbsoluteIndex(i);
                size -= i;
                return;
            }
        }
        
        // If we get here, it means all points are dead
        Reset();
    }
}

var emit = true;
var emitTime = 0.00;
var material : Material;

var lifeTime : float = 1.00;

var colors : Color[];
var sizes : float[];

var uvLengthScale = 0.01;
var higherQualityUVs = true;

var movePixelsForRebuild = 6;
var maxRebuildTime = 0.1;

var minVertexDistance = 0.10;

var maxVertexDistance = 10.00;
var maxAngle = 3.00;

var autoDestruct = false;
var initialNumberOfPoints : int = 50;

private var o : GameObject;
private var points : PointArray;
private var lastPosition : Vector3;
private var lastCameraPosition1 : Vector3;
private var lastCameraPosition2 : Vector3;
private var lastRebuildTime = 0.00;
private var lastFrameEmit = true;
private var i : int = 0;
private var re : boolean = false;
private var theDistance : float = 0;
private var make : boolean = false;
private var l1 : Vector3;
private var l2 : Vector3;
private var cur1 : Vector3;
private var cur2 : Vector3;
private var distance : float;
private var p : Point;
private var time : float;
private var colorTime : float;
private var min : float;
private var max : float;
private var lerp : float;
private var color : Color;
private var sizeTime : float;
private var size : float;
private var lineDirection : Vector3;
private var vectorToCamera : Vector3;
private var perpendicular : Vector3;
//private var 

function Start()
{
  InitTrail(); 
}

function OnEnable()
{
   InitTrail();
}

function InitTrail() 
{
  lastPosition = transform.position;
  o = new GameObject("Trail");
  o.transform.parent = null;
  o.transform.position = Vector3.zero;
  o.transform.rotation = Quaternion.identity;
  o.transform.localScale = Vector3.one;
  o.AddComponent(MeshFilter);
  o.AddComponent(MeshRenderer);
  o.renderer.material = material;
  if (points) {
    points.Reset();
  } else {
      points = new PointArray(initialNumberOfPoints);
  }
}

function OnDisable()
{
   Destroy(o);   
}

function Update()
{
   if (emit && emitTime != 0) {
      emitTime -= Time.deltaTime;
      if (emitTime == 0) emitTime = -1;
      if (emitTime < 0) emit = false;
   }
   
   if (!emit && points.IsEmpty() && autoDestruct) {
      Destroy(o);
      Destroy(gameObject);
   }
   
   // early out if there is no camera
   if (!Camera.main) return;
   
   re = false;
   
   // if we have moved enough, create a new vertex and make sure we rebuild the mesh
   theDistance = (lastPosition - transform.position).magnitude;
   if (emit) {
      if (theDistance > minVertexDistance) {
         make = false;
         if (points.Length() < 3) {
            make = true;
         } else {
            l1 = points.At(-2).position - points.At(-3).position;
            l2 = points.At(-1).position - points.At(-2).position;
            if (Vector3.Angle(l1, l2) > maxAngle || theDistance > maxVertexDistance) 
                make = true;
         }
   
         if (make) {
            points.Add(transform.position);
            lastPosition = transform.position;
         } else {
            points.At(-1).position = transform.position;
            points.At(-1).timeCreated = Time.time;
         }
         
      } else if (points.NotEmpty()) {
         points.At(-1).position = transform.position;
         points.At(-1).timeCreated = Time.time;
      }
   }
   
   if (!emit && lastFrameEmit && points.NotEmpty()) 
     points.At(-1).lineBreak = true;
     
   lastFrameEmit = emit;
   
   // approximate if we should rebuild the mesh or not
   if (points.Length() > 1) {
      cur1 = Camera.main.WorldToScreenPoint(points.At(0).position);
      lastCameraPosition1.z = 0;
      cur2 = Camera.main.WorldToScreenPoint(points.At(-1).position);
      lastCameraPosition2.z = 0;
      
      distance = (lastCameraPosition1 - cur1).magnitude;
      distance += (lastCameraPosition2 - cur2).magnitude;
      
      if (distance > movePixelsForRebuild || Time.time - lastRebuildTime > maxRebuildTime) {
         re = true;
         lastCameraPosition1 = cur1;
         lastCameraPosition2 = cur2;
      }
   } else {
      re = true;   
   }


   if (re) {
      lastRebuildTime = Time.time;
      points.RemoveDeadPoints(lifeTime);
      
      var l : int = points.Length();
      if (l > 1) {  
         var newVertices : Vector3[] = new Vector3[l * 2];
         var newUV : Vector2[] = new Vector2[l * 2];
         var newTriangles : int[] = new int[(l - 1) * 6];
         var newColors : Color[] = new Color[l * 2];
         var curDistance = 0.00;
         
         for (i = 0; i < l; ++i) {
               p = points.At(i);
            time = (Time.time - p.timeCreated) / lifeTime;
            
            if(colors.length > 0) {
               colorTime = time * (colors.length - 1);
               min = Mathf.Floor(colorTime);
               max = Mathf.Clamp(Mathf.Ceil(colorTime), 0, colors.length - 1);
               lerp = Mathf.InverseLerp(min, max, colorTime);
               color = Color.Lerp(colors[min], colors[max], lerp);
            } else {
               color = Color.Lerp(Color.white, Color.clear, time);
            }
            
            if(sizes.length > 0) {
               sizeTime = time * (sizes.length - 1);
               min = Mathf.Floor(sizeTime);
               max = Mathf.Clamp(Mathf.Ceil(sizeTime), 0, sizes.length - 1);
               lerp = Mathf.InverseLerp(min, max, sizeTime);
               size = Mathf.Lerp(sizes[min], sizes[max], lerp);
            } else {
               size = 1;   
            }
            
            if (i == 0) {
                lineDirection = p.position - points.At(i + 1).position;
            } else {
                lineDirection = points.At(i - 1).position - p.position;
            }
            
            vectorToCamera = Camera.main.transform.position - p.position;
            
            perpendicular = Vector3.Cross(lineDirection, vectorToCamera).normalized;
            
            newVertices[i * 2] = p.position + (perpendicular * (size * 0.5));
            newVertices[(i * 2) + 1] = p.position + (-perpendicular * (size * 0.5));
            
            newColors[i * 2] = newColors[(i * 2) + 1] = color;
            
            newUV[i * 2] = Vector2(curDistance * uvLengthScale, 0);
            newUV[(i * 2) + 1] = Vector2(curDistance * uvLengthScale, 1);
            
            if (i > 0 && !points.At(-1).lineBreak) {           
               if (higherQualityUVs) {
                 curDistance += (p.position - points.At(-1).position).magnitude;
               } else {
                 curDistance += (p.position - points.At(-1).position).sqrMagnitude;
               }
               
               newTriangles[(i - 1) * 6] = (i * 2) - 2;
               newTriangles[((i - 1) * 6) + 1] = (i * 2) - 1;
               newTriangles[((i - 1) * 6) + 2] = i * 2;
               
               newTriangles[((i - 1) * 6) + 3] = (i * 2) + 1;
               newTriangles[((i - 1) * 6) + 4] = i * 2;
               newTriangles[((i - 1) * 6) + 5] = (i * 2) - 1;
            }
         }
         
         var mesh : Mesh = (o.GetComponent(MeshFilter) as MeshFilter).mesh;
         mesh.Clear();
         mesh.vertices = newVertices;
         mesh.colors = newColors;
         mesh.uv = newUV;
         mesh.triangles = newTriangles;
      }
   }
}