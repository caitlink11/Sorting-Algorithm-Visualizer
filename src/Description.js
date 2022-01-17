// TODO: add a separate css file

const descriptions = new Map([
  [
    "Bubble",
    {
      complexity: (
        <p>
          O(n<sup>2</sup>)
        </p>
      ),
      description:
        "Iterate through each pair of adjacent values, swapping if necessary to ensure the higher element is in the later position. When you get to the end of the array, the highest-value element will be in the last position. This becomes the sorted section. Then repeat from the beginning of the array, resulting in the next highest element being positioned at the next highest index. Repeat until the entire array is in the sorted section.",
    },
  ],
  [
    "Selection",
    {
      complexity: (
        <p>
          O(n<sup>2</sup>)
        </p>
      ),
      description:
        "Iterate through the array to find and 'select' the lowest-value element and bring it to the front (by shifting all intermediate values one position higher) to become the foundation for the sorted section. Repeat within the unsorted section until all elements are sorted.",
    },
  ],
  [
    "Insertion",
    {
      complexity: (
        <p>
          O(n<sup>2</sup>)
        </p>
      ),
      description:
        "Consider the first element as the foundation for your sorted section. Work with each element immediately outside the sorted section, swapping it 'down' the appropriate number of times until it is properly positioned within the sorted section. Repeat until all elements have been 'inserted'.",
    },
  ],
]);

const Description = (props) => {
  return props.sortMethod ? (
    <>
      <h3 style={{ backgroundColor: "#F0F0F0" }}>
        {props.sortMethod + " Sort"}
      </h3>
      <h4>Worst-Case Time Complexity:</h4>
      {descriptions.get(props.sortMethod).complexity}
      <h4>How it works:</h4>
      <p>{descriptions.get(props.sortMethod).description}</p>
    </>
  ) : (
    <>
      <p>Select a sorting algorithm to get started!</p>
    </>
  );
};

export default Description;
