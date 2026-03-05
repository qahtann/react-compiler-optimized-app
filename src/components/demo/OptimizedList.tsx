import { useMemo, useState, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers, generateMockUsers, LARGE_LIST_SIZE } from '@/lib/mockApi';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRenderCount } from '@/hooks/useRenderCount';
import type { User } from '@/lib/types';
import { Search } from 'lucide-react';

export function OptimizedList() {
  const renderCount = useRenderCount('OptimizedList');
  const [searchQuery, setSearchQuery] = useState('');
  const [useMockData, setUseMockData] = useState(true);

  // Fetch real data
  const { data: realUsers = [], isLoading: isLoadingReal } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: !useMockData,
  });

  // Generate mock data
  const mockUsers = useMemo(
    () => generateMockUsers(LARGE_LIST_SIZE),
    []
  );

  const users = useMockData ? mockUsers : realUsers;
  const isLoading = !useMockData && isLoadingReal;

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const parentRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useVirtualizer({
    count: filteredUsers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Optimized Virtualized List</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Renders: {renderCount}</Badge>
            <Badge variant="outline">
              {filteredUsers.length.toLocaleString()} items
            </Badge>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={useMockData}
              onChange={(e) => setUseMockData(e.target.checked)}
              className="rounded"
            />
            Use {LARGE_LIST_SIZE.toLocaleString()} mock items
          </label>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-muted-foreground">Loading users...</p>
          </div>
        ) : (
          <div
            ref={parentRef}
            className="h-96 w-full overflow-auto rounded-md border"
          >
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const user = filteredUsers[virtualItem.index] as User;
                return (
                  <div
                    key={virtualItem.key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                    className="border-b px-4 py-2"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <Badge variant="outline">{user.id}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
