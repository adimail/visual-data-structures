class Node:
    def __init__(self, value):
        self.data = value
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, value):
        new_node = Node(value)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node


# Example usage
my_list = LinkedList()
my_list.append(1)
my_list.append(2)
my_list.append(3)

# Display the linked list elements
current = my_list.head
while current:
    print(current.data, end=" ")
    current = current.next
