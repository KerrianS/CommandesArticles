// TreeViewComponent.tsx

import React from 'react';

interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
}

interface TreeViewProps {
  data: TreeNode[];
}

const TreeViewComponent: React.FC<TreeViewProps> = ({ data }) => {
  const renderTreeNodes = (nodes: TreeNode[]) => {
    return nodes.map(node => (
      <div key={node.id}>
        <div>{node.name}</div>
        {node.children && renderTreeNodes(node.children)}
      </div>
    ));
  };

  return (
    <div>
      {renderTreeNodes(data)}
    </div>
  );
};

export default TreeViewComponent;
